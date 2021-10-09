import React from 'react';
import { Text, View, Image } from 'react-native';
import { PostType } from '../../../types';
import styles from './style';

export type PostBodyProps = {
    post: PostType
}

const PostBody = ({ post }: PostBodyProps) => {
    return (
        <View style={styles.postBodyContainer}>
            {post.text !== '' && <Text style={styles.content}>{post.text}</Text>}
            {post && post.images[0] && post.images[0].link && <Image style={styles.image} source={{ uri: post.images[0].link }} />}
        </View>
    );
}

export default PostBody;