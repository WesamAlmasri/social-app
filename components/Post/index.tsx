import React from 'react';
import { View } from 'react-native';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

import { PostType } from '../../types';

export type PostProps = {
    post: PostType,
}

const Post = ({ post }: PostProps) => (
    <View>
        <PostHeader post={post} />
        <PostBody post={post} />
        <PostFooter post={post} />
    </View>
)

export default Post;