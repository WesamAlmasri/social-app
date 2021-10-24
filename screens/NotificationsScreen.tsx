import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SingleNotificationRow from '../components/SingleNotificationRow';

// Dummy Data
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { NotificationType } from '../types';
import { NOTIFICATIONS_URL } from '../urls';

export default function NotificationsScreen() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getNotifications = async () => {
    setLoading(true);
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: NOTIFICATIONS_URL,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setLoading(false);
      setError('Error occurred!');
    });

    if (response) {
      setNotifications(response.data.results);
      setLoading(false);
    } else {
      setLoading(false);
      setError('Error occurred!');
    }
  }

  const updateUnseenNotifications = async (notificationID: string) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: `${NOTIFICATIONS_URL}/${notificationID}`,
      method: 'PUT',
      token: token.access_token,
    })?.catch(e => {
      setError('Error occurred!');
    });

    if (response) {

    } else {
      setError('Error occurred!');
    }
  }

  useEffect(() => {
    if (isFocused) {
      getNotifications();
    }
  }, [isFocused]);

  useEffect(() => {
    if (notifications) {
      notifications.map(notification => {
        if (!notification.seen) {
          updateUnseenNotifications(notification.id);
        }
      })
    }
  }, [notifications]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        error,
        [{
          text: 'Ok',
          onPress: () => setError(null)
        }]
      );
    }
  }, [error]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {
        notifications.length === 0 ? <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No Notifications</Text>
        </View> : <FlatList data={notifications} renderItem={({ item }) => <SingleNotificationRow notification={item} />} />
      }

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  noNotificationsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  noNotificationsText: {
    fontSize: 25,
    padding: 10
  },
});
