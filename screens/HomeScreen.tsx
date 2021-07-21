import * as React from 'react';
import { StyleSheet } from 'react-native';

import Feed from '../components/Feed';
import { View } from '../components/Themed';

// Dummy Data
import posts from '../data/posts';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Feed posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec'
  },
});
