import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { useNavigation } from '@react-navigation/native';


export type SingleProfileRowProps = {
    profile: ProfileType<UserFileType>
}

const SingleProfileRow = ({ profile }: SingleProfileRowProps) => {

    const navigation = useNavigation();

    const onPressProfile = () => {
        navigation.navigate('SingleProfile', {profileId: profile.id});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressProfile} style={styles.touchableContainer}>
                <ProfilePicture size={50} image={profile.profile_picture?.link} />
                <View style={styles.rightSide}>
                    <Text style={styles.username}>{profile.user?.username}</Text>
                    {profile.caption !== '' && <Text style={styles.caption}>{profile.caption}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SingleProfileRow;