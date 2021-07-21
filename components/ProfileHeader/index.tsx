import React from 'react';
import { Text } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
    return (
        <Text>Profile Header</Text>
    )
}

export default ProfileHeader;