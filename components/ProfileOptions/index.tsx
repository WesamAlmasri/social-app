import React from 'react';
import { Text } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
}

const ProfileOptions = ({ profile }: ProfileHeaderProps) => {
    return (
        <Text>Profile Options</Text>
    )
}

export default ProfileOptions;