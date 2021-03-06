import React from 'react';
import { Image } from 'react-native';

export type ProfilePictureProps = {
    image?: string,
    size?: number,
}

const ProfilePicture = ({ image, size = 50 }: ProfilePictureProps) => {
    return (
        <Image source={{ uri: image || 'https://hexagon-sm.s3.eu-central-1.amazonaws.com/male.jpg' }} style={{ width: size, height: size, borderRadius: size }} />
    )
}

export default ProfilePicture;