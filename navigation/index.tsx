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
import ConversationScreen from '../screens/ConversationScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
      <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      <Stack.Screen name="Login" component={AuthScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="SingleProfile" component={ProfileScreen} />
      <Stack.Screen name="SinglePost" component={SinglePostScreen} />
      {/* <Stack.Screen name="Conversation" component={ConversationScreen} /> */}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const RegisterScreen = () => (
  <AuthScreen register />
)