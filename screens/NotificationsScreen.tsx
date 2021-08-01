import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SingleNotificationRow from '../components/SingleNotificationRow';

// Dummy Data
import notifications from '../data/notifications';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
        <FlatList data={notifications} renderItem={({item}) => <SingleNotificationRow notification={item} />} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
