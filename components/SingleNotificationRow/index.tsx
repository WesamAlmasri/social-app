import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import { NotificationType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { useNavigation } from '@react-navigation/native';

// Dummy Data
import profiles from '../../data/profiles';
import moment from 'moment';

export type SingleNotificationRowProps = {
    notification: NotificationType
}

const SingleNotificationRow = ({ notification }: SingleNotificationRowProps) => {
    const [profilePic, setProfilePic] = useState<string | null>(null);

    const navigation = useNavigation();

    const onPressNotification = () => {
        navigation.navigate('SinglePost', {postId: notification.post_id});
    }

    useEffect(() => {
        setProfilePic(profiles[0].profile_picture.link);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressNotification} style={styles.touchableContainer}>
                {profilePic && <ProfilePicture size={50} image={profilePic} />}
                <View style={styles.rightSide}>
                    <Text style={styles.message}>{notification.message}</Text>
                    {<Text style={styles.createdAt}>{moment(notification.created_at).fromNow()}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SingleNotificationRow;