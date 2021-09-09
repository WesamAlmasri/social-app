import Axios, {
  AxiosPromise,
  AxiosRequestConfig,
  CancelToken,
  CancelTokenSource
} from 'axios';
import { ME_URL, REFRESH_URL, LOGOUT_URL } from './urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { DispatchType } from './store/userDetails/types';
import { updateUserDetails } from './store/userDetails/actionCreators';

export const tokenName = 'tokenName';

export type tokenType = {
  access_token: string;
  refresh_token: string;
};

// Get data from local storage
export const getData = async (
  storageKey: string
): Promise<string | null | undefined> => {
  try {
    return await AsyncStorage.getItem(storageKey);
  } catch (e) {
    // Error reading value
    console.log('Error getting local storage');
  }
};

// Store data to local storage
export const storeData = async (
  storageKey: string,
  value: string
): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, value);
  } catch (e) {
    // Error reading value
    console.log('Error storing local storage');
  }
};

// Remove data from local storage
export const removeData = async (storageKey: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (e) {
    // Error reading value
    console.log('Error removing local storage');
  }
};
// Logout function
export const logout = async (
  dispatch: DispatchType,
  source: CancelTokenSource,
  navigation: NavigationProp<any>
) => {
  if (await getData(tokenName)) {
    await axiosHandler({
      method: 'GET',
      url: LOGOUT_URL,
      token: await getToken(dispatch, source, navigation),
      cancelToken: source.token || null,
    })?.catch(e => null);
  }
  await removeData(tokenName);
  dispatch(updateUserDetails(null));
  // navigate to login screen
  navigation.navigate('Login');
};

interface axiosProps {
  method: string;
  url: string;
  token?: string | null;
  data?: object | null;
  extra?: object | null;
  cancelToken?: CancelToken | null;
}

export const axiosHandler = ({
  method = 'get',
  url = '',
  token = null,
  data = null,
  extra = null,
  cancelToken = null,
}: axiosProps): AxiosPromise<any> | undefined => {
  if (data?.toString() !== '[object Object]' || ["GET", "POST", "PATCH", "PUT", "DELETE"].includes(method.toUpperCase())) {
    let axiosProps: AxiosRequestConfig = { method, url, data };

    if (token) {
      axiosProps.headers = { Authorization: `Bearer ${token}` };
    }

    if (extra) {
      axiosProps.headers = { ...axiosProps.headers, ...extra };
    }

    if (cancelToken) {
      axiosProps = { ...axiosProps, cancelToken: cancelToken };
    }
    return Axios(axiosProps);
  } else {
    alert(`method ${method} is not accepted or data is not an object`);
  }
};

// Get the token
export const getToken = async (
  dispatch: DispatchType,
  source: CancelTokenSource,
  navigation: NavigationProp<any>
): Promise<string | undefined> => {
  const tokenString = await getData(tokenName);

  if (!tokenString) {
    await logout(dispatch, source, navigation);
  } else {
    let isCanceled = false;
    const token: tokenType = JSON.parse(tokenString);
    const userProfile = await axiosHandler({
      method: 'GET',
      url: ME_URL,
      token: token.access_token,
      cancelToken: source.token,
    })?.catch((e) => {
      if (Axios.isCancel(e)) {
        isCanceled = true;
      }
    });
    if (userProfile) {
      return token.access_token;
    } else {
      const newAccessToken = await axiosHandler({
        method: 'POST',
        url: REFRESH_URL,
        data: {
          refresh_token: token.refresh_token,
        },
      })?.catch((e) => {
        if (Axios.isCancel(e)) {
          isCanceled = true;
        }
      });

      if (newAccessToken) {
        await storeData(tokenName, JSON.stringify(newAccessToken.data));
        return newAccessToken.data.access_token;
      } else {
        if (!isCanceled) logout(dispatch, source, navigation);
      }
    }
  }
};
