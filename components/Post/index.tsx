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
    single?: boolean
}

const Post = ({ post, single }: PostProps) => {
    const navigation = useNavigation();

    const onPostDetails = () => {
        if(single) return;
        navigation.navigate('SinglePostScreen', { postId: post.id });
    }

    return (

        <View style={styles.container}>
            <PostHeader post={post} single={single} />
            <TouchableOpacity onPress={onPostDetails} activeOpacity={0.8}>
                <PostBody post={post} />
            </TouchableOpacity>
            <PostFooter post={post} single={single} />
        </View>
    )
}

export default Post;