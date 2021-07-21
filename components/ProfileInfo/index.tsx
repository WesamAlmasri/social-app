import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';
import { Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
}

const ProfileInfo = ({ profile }: ProfileHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileInfoRow}>
                <MaterialIcons color='#949494' size={25} name='perm-identity' />
                <Text style={styles.profileInfoText}>Name: {profile.first_name} {profile.last_name}</Text>
            </View>
            <View style={styles.profileInfoRow}>
                <Entypo color='#949494' size={25} name='email' />
                <Text style={styles.profileInfoText}>Email: {profile.user?.email}</Text>
            </View>
            <View style={styles.profileInfoRow}>
                <MaterialCommunityIcons color='#949494' size={25} name='signal-variant' />
                <Text style={styles.profileInfoText}>{profile.followers} followers</Text>
            </View>
            <View style={styles.profileInfoRow}>
                <FontAwesome5 color='#949494' size={20} name='user-friends' />
                <Text style={styles.profileInfoText}>{profile.followings} followings</Text>
            </View>
        </View>
    )
}

export default ProfileInfo;