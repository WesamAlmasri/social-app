import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { FontAwesome } from '@expo/vector-icons';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {

    if(!profile){
        return <Text>Loader</Text>
    }

    return (
        <View style={styles.container}>
            <ProfilePicture size={75} image={profile.profile_picture?.link} />
            <View style={styles.rightSide}>
                <Text style={styles.username}>{profile.user?.username}</Text>
                <Text style={styles.caption}>{profile.caption}</Text>
                <View style={styles.onlineStatus}>
                    {profile.user?.last_login && <Text style={styles.onlineText}>
                        {
                            (new Date().getTime() - new Date(profile.user?.last_login).getTime()) / 1000 <= 60 ? 'online' : 'offline'
                        }
                    </Text>}
                    <FontAwesome color='grey' name='mobile-phone' />
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader;