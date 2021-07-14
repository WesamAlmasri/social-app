import React from 'react';
import { Text, View, Image } from 'react-native';
import { PostType } from '../../../types';
import styles from './style';

export type PostBodyProps = {
    post: PostType
}

const PostBody = ({ post }: PostBodyProps) => (
    <View style={styles.postBodyContainer}>
        {post.text && <Text style={styles.content}>{post.text}</Text>}
        {post.images[0] && <Image style={styles.image} source={{ uri: post.images[0].link }} />}
    </View>
)

export default PostBody;