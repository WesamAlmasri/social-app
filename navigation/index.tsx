/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import AuthScreen from '../screens/AuthScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { useSelector } from 'react-redux';
import { StoreStateType } from '../store/types';
import AuthController from '../components/authController';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user } = useSelector(mapStateToProps);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <AuthNavigator /> */}
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='authController' component={AuthController} />
      <Stack.Screen name="Login" component={AuthScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="SingleProfile" component={ProfileScreen} />
      <Stack.Screen name="SinglePost" component={SinglePostScreen} />
      {/* <Stack.Screen name="Conversation" component={ConversationScreen} /> */}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

// function AuthNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={AuthScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//     </Stack.Navigator>
//   );
// }

const RegisterScreen = () => (
  <AuthScreen register />
)

const mapStateToProps = (state: StoreStateType) => ({
  user: state.user.user,
});