import React from 'react';
import { Text, View } from 'react-native';
import { PostType } from '../../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

import ProfilePicture from '../../ProfilePicture';

export type PostHeaderProps = {
    post: PostType
}

const PostHeader = ({ post }: PostHeaderProps) => (
    <View>
        <ProfilePicture size={75} image={post.profile.profile_picture?.link} />
        <View>
            <Text>{post.profile.user.username}</Text>
            <Text>{post.created_at}</Text>
        </View>
        <MaterialCommunityIcons size={30} color={Colors.light.tabIconDefault} name='dots-vertical' />
    </View>
)

export default PostHeader;