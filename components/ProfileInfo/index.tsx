import React from 'react';
import { Text } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
}

const ProfileInfo = ({ profile }: ProfileHeaderProps) => {
    return (
        <Text>Profile Info</Text>
    )
}

export default ProfileInfo;