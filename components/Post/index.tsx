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
    deletePosts: Function,
    updatePostLikes: Function
}

const Post = ({ post, deletePosts, updatePostLikes }: PostProps) => {
    const navigation = useNavigation();

    const onPostDetails = () => {
        navigation.navigate('SinglePostScreen', { post: post/*, deletePosts: deletePosts, updatePostLikes: updatePostLikes*/ });
        navigation.setOptions({})
    }

    return (

        <View style={styles.container}>
            <PostHeader post={post} deletePosts={deletePosts} />
            <TouchableOpacity onPress={onPostDetails} activeOpacity={0.8}>
                <PostBody post={post} />
            </TouchableOpacity>
            <PostFooter post={post} updatePostLikes={updatePostLikes} />
        </View>
    )
}

export default Post;