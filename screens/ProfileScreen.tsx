import * as React from 'react';
import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import ProfileOptions from '../components/ProfileOptions';
import { Text, View } from '../components/Themed';

// Dummy Data
import meProfile from '../data/meProfile';
import posts from '../data/posts';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader profile={meProfile} />
      <ProfileInfo profile={meProfile} />
      <ProfileOptions profile={meProfile} />
      <Feed profile posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
