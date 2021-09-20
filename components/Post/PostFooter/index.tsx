import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { PostType } from '../../../types';
import styles from './style';
import { StoreStateType } from '../../../store/types';
import { useSelector } from 'react-redux';
import { axiosHandler, getData, tokenName, tokenType } from '../../../helper';
import { useNavigation } from '@react-navigation/core';
import { INTERACTION_URL } from '../../../urls';

export type PostFooterProps = {
    post: PostType
}

const PostFooter = ({ post }: PostFooterProps) => {
    const { userDetails } = useSelector(mapStateToProps);
    const [postInfo, setPostInfo] = useState<PostType>(post);

    const navigation = useNavigation();

    const onLikePress = async () => {
        const tokenString = await getData(tokenName);
        if (!tokenString) {
            navigation.navigate('Login');
            return;
        }
        const token: tokenType = JSON.parse(tokenString);

        setPostInfo(prev => ({
            ...prev,
            am_like: !prev.am_like,
            likes: prev.likes ? prev.am_like ? prev.likes - 1 : prev.likes + 1 : undefined
        }));

        const response = await axiosHandler({
            url: INTERACTION_URL,
            method: 'POST',
            data: { post_id: postInfo.id },
            token: token.access_token,
        })?.catch(e => {
            setPostInfo(prev => ({
            ...prev,
            am_like: !prev.am_like,
            likes: prev.likes ? prev.am_like ? prev.likes - 1 : prev.likes + 1 : undefined
        }));
        });

        if (!response) {
            setPostInfo(prev => ({
                ...prev,
                am_like: !prev.am_like,
                likes: prev.likes ? prev.am_like ? prev.likes - 1 : prev.likes + 1 : undefined
            }));
        }
    }

    useEffect(() => {
        setPostInfo(post);
    }, [])

    return (
        <View style={styles.postFooterContainer}>
            <TouchableOpacity style={styles.likesContainer} activeOpacity={0.8} onPress={onLikePress}>
                <Ionicons size={25} name='heart-outline' color={postInfo.am_like ? Colors.light.tabIconSelected : Colors.light.tabIconDefault} />
                <Text style={styles.numberOfLikes}>{postInfo.likes}</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons size={25} name='comment-outline' color={Colors.light.tabIconDefault} />
        </View>
    );
}

const mapStateToProps = (state: StoreStateType) => ({
    userDetails: state.user.user,
});

export default PostFooter;