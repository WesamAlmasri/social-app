import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { PostType } from '../../../types';

export type PostFooterProps = {
    post: PostType
}

const PostFooter = ({ post }: PostFooterProps) => (
    <View>
        <View>
            <Ionicons size={25} name='heart-outline' color={post.am_like ? Colors.light.tabIconSelected : Colors.light.tabIconDefault} />
            <Text>{post.likes}</Text>
        </View>
        <MaterialCommunityIcons size={25} name='comment-outline' color={Colors.light.tabIconDefault} />
    </View>
)

export default PostFooter;