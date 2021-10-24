import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import { NotificationType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { useNavigation } from '@react-navigation/native';


import moment from 'moment';

export type SingleNotificationRowProps = {
    notification: NotificationType
}

const SingleNotificationRow = ({ notification }: SingleNotificationRowProps) => {
    const navigation = useNavigation();

    const onPressNotification = () => {
        navigation.navigate('SinglePost', {postId: notification.post_id});
    }
    

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressNotification} style={{...styles.touchableContainer, backgroundColor: !notification.seen ? '#f4f4f4' : '#fff'}}>
                {/* {profilePic && <ProfilePicture size={50} image={profilePic} />} */}
                <View style={styles.notificationImage}><Text style={styles.nText}>N</Text></View>
                <View style={styles.rightSide}>
                    <Text style={styles.message}>{notification.message}</Text>
                    {<Text style={styles.createdAt}>{moment(notification.created_at).fromNow()}</Text>}
                </View>
                <View style={styles.notificationState}/>
            </TouchableOpacity>
        </View>
    )
}

export default SingleNotificationRow;