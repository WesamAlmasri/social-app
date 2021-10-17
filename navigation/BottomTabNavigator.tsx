/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Feather, Ionicons } from '@expo/vector-icons';
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
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../store/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logout } from '../helper';
import { useNavigation } from '@react-navigation/core';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

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

const mapStateToProps = (state: StoreStateType) => ({
  user: state.user.user,
});

function HomeNavigator() {
  const userProfile = useSelector(mapStateToProps);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onLogout = async () => {
    await logout(dispatch, null, navigation);
    setModalVisible(false);
  }


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
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.6}>
              <ProfilePicture size={40} image={userProfile.user?.profile_picture?.link} />
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Feather style={styles.exitBtn} size={25} name='x' />
                    </TouchableOpacity>
                    <Text style={styles.confirmText}>Do you want logout?</Text>
                    <TouchableOpacity onPress={onLogout} style={styles.deleteBtn}>
                      <Text style={styles.deleteBtnText}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
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
        component={ProfileScreen}
        // children={ProfileScreen}
        // initialParams={{profileName: userProfile.user?.user?.username}}
        options={{ headerTitle: 'Profile', headerShown: false }}
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
        options={{ headerTitle: 'Chat', headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '70%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmText: {
    alignSelf: 'center',
    marginTop: 10
  },
  exitBtn: {
    alignSelf: 'flex-end'
  },
  deleteBtn: {
    backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  deleteBtnText: {
    color: '#fff'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})