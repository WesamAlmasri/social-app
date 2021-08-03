import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProfileWithMessageType, UserFileType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { useNavigation } from '@react-navigation/native';


export type SingleProfileWithMessageRowProps = {
    profileWithMessage: ProfileWithMessageType<UserFileType>
}

const SingleProfileWithMessageRow = ({ profileWithMessage }: SingleProfileWithMessageRowProps) => {

    const navigation = useNavigation();

    const onPressConversation = () => {
        // navigation.navigate('ConversationScreen', {receiverId: profileWithMessage.id});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressConversation} style={styles.touchableContainer}>
                <ProfilePicture size={50} image={profileWithMessage.profile_picture?.link} />
                <View style={styles.rightSide}>
                    <Text style={styles.username}>{profileWithMessage.user?.username}</Text>
                    {profileWithMessage.caption !== '' && <Text style={styles.caption}>{profileWithMessage.caption}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SingleProfileWithMessageRow;