import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import ProfileOptions from '../components/ProfileOptions';
import { View, Text, TouchableOpacity } from 'react-native';
import { ProfileType, UserFileType } from '../types';


// Dummy Data
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StoreStateType } from '../store/types';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { PROFILE_POSTS_URL, PROFILE_URL } from '../urls';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostsList } from '../store/posts/actionCreators';

export type ProfileScreenProps = {

}

export type ProfileScreenRouteProp = {
  params: {
    profileName: string
  }
}

export type ProfileTopPartProps = {
  profile: ProfileType<UserFileType> | null,
  meProfile: boolean
}

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<ProfileType<UserFileType> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, posts } = useSelector(mapStateToProps);

  const route = useRoute<RouteProp<ProfileScreenRouteProp, 'params'>>();

  const getProfileData = async (profileName: string | undefined) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: `${PROFILE_URL}/${profileName}`,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError(e.response.data);
    });

    if (response) {
      setProfileData(response.data);
    } else {
      setError('Error occurred!');
    }
  }

  const getPosts = async (profileId: string | undefined) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    let url = `${PROFILE_POSTS_URL}/${profileId}`;

    const response = await axiosHandler({
      url: url,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError(e.response.data);
    });

    if (response) {
      dispatch(updatePostsList(response.data.results))
    } else {
      dispatch(updatePostsList([]))
      setError('Error occurred!');
    }

  }

  useEffect(() => {
    (
      async () => {
        dispatch(updatePostsList([]));
        if (!route.params?.profileName) {
          console.log(user?.user?.username);
          await getProfileData(user?.user?.username);
          await getPosts(user?.id);
        } else {
          console.log(route.params?.profileName);
          await getProfileData(route.params?.profileName);
          await getPosts(profileData?.id);
        }
      }
    )();
  }, [])

  // useEffect(() => {

  // },[profileData]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        error,
        [{
          text: 'Ok',
          onPress: () => setError(null)
        }]
      );
    }
  }, [error]);

  if (!profileData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        profileData?.id !== user?.id && <ProfileBackHeader />
      }
      <Feed Header={() => ProfileTopPart({ profile: profileData, meProfile: profileData?.id === user?.id })} />
    </SafeAreaView>
  );
}

const ProfileTopPart = ({ profile, meProfile }: ProfileTopPartProps) => {
  console.log('Profile from TOP PART : ', profile)
  if (!profile) {
    return null;
  }
  return (
    <>
      <ProfileHeader profile={profile} />
      <ProfileOptions profile={profile} meProfile={meProfile} />
      <ProfileInfo profile={profile} />
    </>
  )
}

const ProfileBackHeader = () => {

  const navigation = useNavigation();

  const onCancel = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
        <Ionicons color={Colors.light.tabIconSelected} size={30} name='md-chevron-back' />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} activeOpacity={0.8} style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state: StoreStateType) => ({
  posts: state.posts.posts,
  user: state.user.user
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#ececec',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#d0d0d0',
    backgroundColor: '#fff'
  },
  headerTitleContainer: {
    position: 'absolute',
    left: '12%',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
