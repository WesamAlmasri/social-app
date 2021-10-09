import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { PostType } from '../../../types';
import styles from './style';
import { StoreStateType } from '../../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { axiosHandler, getData, tokenName, tokenType } from '../../../helper';
import { useNavigation } from '@react-navigation/core';
import { INTERACTION_URL } from '../../../urls';
import { updatePost } from '../../../store/posts/actionCreators';

export type PostFooterProps = {
    post: PostType,
    single?: boolean
}

const PostFooter = ({ post, single }: PostFooterProps) => {
    const { userDetails } = useSelector(mapStateToProps);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onPostDetails = () => {
        console.log('single : ', single);
        if(single) return;
        console.log('reached')
        navigation.navigate('SinglePostScreen', { postId: post.id });
    }

    const onLikePress = async () => {
        const tokenString = await getData(tokenName);
        if (!tokenString) {
            navigation.navigate('Login');
            return;
        }
        const token: tokenType = JSON.parse(tokenString);

        dispatch(updatePost(post.id));

        const response = await axiosHandler({
            url: INTERACTION_URL,
            method: 'POST',
            data: { post_id: post.id },
            token: token.access_token,
        })?.catch(e => {
            dispatch(updatePost(post.id));
        });

        if (!response) {
            dispatch(updatePost(post.id));
        }
    }

    return (
        <View style={styles.postFooterContainer}>
            <TouchableOpacity style={styles.likesContainer} activeOpacity={0.8} onPress={onLikePress}>
                <Ionicons size={25} name='heart-outline' color={post.am_like ? Colors.light.tabIconSelected : Colors.light.tabIconDefault} />
                <Text style={styles.numberOfLikes}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={onPostDetails}>
                <MaterialCommunityIcons size={25} name='comment-outline' color={Colors.light.tabIconDefault} />
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = (state: StoreStateType) => ({
    userDetails: state.user.user,
});

export default PostFooter;