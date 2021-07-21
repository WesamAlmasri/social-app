import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
}

const ProfileOptions = ({ profile }: ProfileHeaderProps) => {
    const [amFollow, setAmFollow] = useState(profile.am_follow);

    const onPressEdit = () => {
        console.warn('press edit, should navigate to edit screen');
    }

    const onToggleFollow = () => {
        setAmFollow(!amFollow);
    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={onPressEdit} activeOpacity={0.7} style={styles.editButton}>
                <Text style={styles.editText}>
                    Edit
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onToggleFollow} style={{...styles.followButton, backgroundColor: amFollow ? '#f1f1f1' : '#2f95dc'}}>
                <Text style={{...styles.followText, color: amFollow ? '#2f95dc' : '#f1f1f1'}}>
                   {
                       amFollow ? 'unFollow': 'Follow'
                   }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileOptions;