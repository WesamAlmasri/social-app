import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import ProfileOptions from '../components/ProfileOptions';
import { View, Text, TouchableOpacity } from 'react-native';
import { ProfileType, UserFileType } from '../types';


// Dummy Data
import meProfile from '../data/meProfile';
import profiles from '../data/profiles';
import posts from '../data/posts';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

export type ProfileScreenProps = {
  profileId: string,
}

export type ProfileScreenRouteProp = {
  params: {
    profileId: string
  }
}

export type ProfileTopPartProps = {
  profile: ProfileType<UserFileType> | null,
  meProfile: boolean
}

export default function ProfileScreen({ profileId }: ProfileScreenProps) {
  const [profileData, setProfileData] = useState<ProfileType<UserFileType> | null>(meProfile);

  const route = useRoute<RouteProp<ProfileScreenRouteProp, 'params'>>();

  console.log(route.params?.profileId);
  
  // useEffect(() => {
  //   // request the api to get all profile data
  //   setProfileData(meProfile);
  // }, [meProfile])

  if (!profileData) {
    return <Text>Loader</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        profileData?.id !== profileId && <ProfileBackHeader />
      }
      <Feed Header={() => ProfileTopPart({ profile: profileData, meProfile: profileData?.id === profileId })} posts={posts} />
    </SafeAreaView>
  );
}

const ProfileTopPart = ({ profile, meProfile }: ProfileTopPartProps) => {
  if(!profile){
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
