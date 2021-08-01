import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import { NotificationType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { useNavigation } from '@react-navigation/native';

// Dummy Data
import notifications from '../../data/notifications';

export type SingleNotificationRowProps = {
    notification: NotificationType
}

const SingleNotificationRow = ({ notification }: SingleNotificationRowProps) => {

    const navigation = useNavigation();

    const onPressNotification = () => {
        navigation.navigate('SingleProfile', {NotificationId: notification.id});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressNotification} style={styles.touchableContainer}>
                <ProfilePicture size={50} image={profile.profile_picture?.link} />
                <View style={styles.rightSide}>
                    <Text style={styles.username}>{profile.user?.username}</Text>
                    {profile.caption !== '' && <Text style={styles.caption}>{profile.caption}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SingleNotificationRow;