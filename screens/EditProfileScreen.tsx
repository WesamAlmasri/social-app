import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

// Dummy Data
import meProfile from '../data/meProfile';

export default function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Edit Profile Screen</Text>
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
