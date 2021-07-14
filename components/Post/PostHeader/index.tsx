import React from 'react';
import { Text, View } from 'react-native';
import { PostType } from '../../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import styles from './style';
import moment from 'moment';

import ProfilePicture from '../../ProfilePicture';

export type PostHeaderProps = {
    post: PostType
}

const PostHeader = ({ post }: PostHeaderProps) => (
    <View style={styles.postHeaderContainer}>
        <ProfilePicture size={50} image={post.profile.profile_picture?.link} />
        <View style={styles.middle}>
            <Text style={styles.username}>{post.profile.user.username}</Text>
            <Text style={styles.createdAt}>{moment(post.created_at).fromNow()}</Text>
        </View>
        <MaterialCommunityIcons style={styles.threeDotsIcon} size={30} color={Colors.light.tabIconDefault} name='dots-vertical' />
    </View>
)

export default PostHeader;