import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProfileWithMessageType, UserFileType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateActiveChatUser } from '../../store/chat/actionCreators';


export type SingleProfileWithMessageRowProps = {
    profileWithMessage: ProfileWithMessageType<UserFileType>
}

const SingleProfileWithMessageRow = ({ profileWithMessage }: SingleProfileWithMessageRowProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const onPressConversation = () => {
        dispatch(updateActiveChatUser(profileWithMessage));
        navigation.navigate('ConversationScreen', {receiverUsername: profileWithMessage.user?.username});
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