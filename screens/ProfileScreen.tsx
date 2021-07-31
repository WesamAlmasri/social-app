import * as React from 'react';
import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import ProfileOptions from '../components/ProfileOptions';
import { View } from 'react-native';

// Dummy Data
import meProfile from '../data/meProfile';
import posts from '../data/posts';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Feed Header={ProfileTopPart} posts={posts} />
    </View>
  );
}

const ProfileTopPart = () => (
  <>
    <ProfileHeader profile={meProfile} />
    <ProfileOptions profile={meProfile} meProfile />
    <ProfileInfo profile={meProfile} />
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec'
  },
});
