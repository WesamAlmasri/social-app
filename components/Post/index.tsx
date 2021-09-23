import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './style';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import { PostType } from '../../types';
import { useNavigation } from '@react-navigation/native';

export type PostProps = {
    post: PostType,
}

const Post = ({ post }: PostProps) => {
    const navigation = useNavigation();

    const onPostDetails = () => {
        navigation.navigate('SinglePostScreen', { post: post });
    }

    return (

        <View style={styles.container}>
            <PostHeader post={post} />
            <TouchableOpacity onPress={onPostDetails} activeOpacity={0.8}>
                <PostBody post={post} />
            </TouchableOpacity>
            <PostFooter post={post} />
        </View>
    )
}

export default Post;