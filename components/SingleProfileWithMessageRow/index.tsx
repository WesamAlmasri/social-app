import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProfileWithMessageType, UserFileType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


export type SingleProfileWithMessageRowProps = {
    profileWithMessage: ProfileWithMessageType<UserFileType>
}

const SingleProfileWithMessageRow = ({ profileWithMessage }: SingleProfileWithMessageRowProps) => {

    const navigation = useNavigation();

    const onPressConversation = () => {
        navigation.navigate('ConversationScreen', {receiverId: profileWithMessage.id});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressConversation} style={styles.touchableContainer}>
                <ProfilePicture size={50} image={profileWithMessage.profile_picture?.link} />
                <View style={styles.rightSide}>
                    <Text style={styles.username}>{profileWithMessage.user?.username}</Text>
                    <Text style={styles.caption}>{profileWithMessage.last_message.message}</Text>
                    <Text style={styles.createdAt}>{moment(profileWithMessage.last_message.created_at).fromNow()}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SingleProfileWithMessageRow;