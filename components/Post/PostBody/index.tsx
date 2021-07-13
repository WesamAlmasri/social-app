import React from 'react';
import { Text, View, Image } from 'react-native';
import { PostType } from '../../../types';

export type PostBodyProps = {
    post: PostType
}

const PostBody = ({ post }: PostBodyProps) => (
    <View>
        {post.text && <Text>{post.text}</Text>}
        {post.images[0] && <Image style={{width: '100%', height: 250, resizeMode: 'contain'}} source={{ uri: post.images[0].link }} />}
    </View>
)

export default PostBody;