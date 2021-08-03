/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { BottomTabParamList, HomeNavigatorParamList, MessagesNavigatorParamList, NotificationsNavigatorParamList, ProfileNavigatorParamList, SearchNavigatorParamList } from '../types';
import ProfilePicture from '../components/ProfilePicture';
import NewPostScreen from '../screens/NewPostScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import meProfile from '../data/meProfile';
import NotificationsScreen from '../screens/NotificationsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ConversationScreen from '../screens/ConversationScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, showLabel: false }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="notifications-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbox-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15
          },
          headerTitle: "Home",
          headerLeft: () => (
            <ProfilePicture size={40} image={'https://avatars.githubusercontent.com/u/71489065?v=4'} />
          )
         }}
      />
      <HomeStack.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={{ 
          headerShown: false,
          headerTitle: "New Post",
         }}
      />
      <HomeStack.Screen
        name="SinglePostScreen"
        component={SinglePostScreen}
        options={{ 
          headerShown: false,
          headerTitle: "Post",
         }}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileNavigatorParamList>();

export function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        // component={() => ProfileScreen({profile: meProfile, meProfile: true})}
        children={() => ProfileScreen({profileId: meProfile.id})}
        options={{ headerTitle: 'Profile' }}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerTitle: 'Edit Profile' }}
      />
    </ProfileStack.Navigator>
  );
}

const SearchStack = createStackNavigator<SearchNavigatorParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: 'Search' }}
      />
    </SearchStack.Navigator>
  );
}

const NotificationsStack = createStackNavigator<NotificationsNavigatorParamList>();

function NotificationsNavigator() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerTitle: 'Notifications' }}
      />
    </NotificationsStack.Navigator>
  );
}

const MessagesStack = createStackNavigator<MessagesNavigatorParamList>();

function MessagesNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ headerTitle: 'Messages' }}
      />
      <MessagesStack.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={{ headerTitle: 'Chat' }}
      />
    </MessagesStack.Navigator>
  );
}