import * as React from 'react';
import { StyleSheet } from 'react-native';

import Post from '../components/Post';
import { View } from '../components/Themed';
import posts from '../data/posts';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Post post={posts[0]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
