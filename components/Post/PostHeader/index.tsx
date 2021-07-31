import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { PostType } from '../../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import styles from './style';
import moment from 'moment';
import Feather from '@expo/vector-icons/Feather'
import ProfilePicture from '../../ProfilePicture';
import { useNavigation } from '@react-navigation/native';

export type PostHeaderProps = {
    post: PostType
}

const PostHeader = ({ post }: PostHeaderProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const onDeletePost = (postId: string) => {
        console.warn('delete post', postId);
    }

    const onPressProfile = () => {
        navigation.navigate('SingleProfile', {profileId: post.profile.id});
    }

    return (
        <View style={styles.postHeaderContainer}>
            <TouchableOpacity onPress={onPressProfile}>
                <ProfilePicture size={50} image={post.profile.profile_picture?.link} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressProfile} style={styles.middle}>
                <Text style={styles.username}>{post.profile.first_name} {post.profile.last_name}</Text>
                <Text style={styles.createdAt}>{moment(post.created_at).fromNow()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.6}>
                <MaterialCommunityIcons style={styles.threeDotsIcon} size={30} color={Colors.light.tabIconDefault} name='dots-vertical' />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Feather style={styles.exitBtn} size={25} name='x' />
                        </TouchableOpacity>
                        <Text style={styles.confirmText}>Do you want to delete the comment?</Text>
                        <TouchableOpacity onPress={() => onDeletePost(post.id)} style={styles.deleteBtn}>
                            <Text style={styles.deleteBtnText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default PostHeader;