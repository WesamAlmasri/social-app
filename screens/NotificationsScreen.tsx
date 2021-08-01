import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Dummy Data
import notifications from '../data/notifications';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
        <Text>Notifications Screen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
