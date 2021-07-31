import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import styles from "./style";
import { CommentType } from "../../types";
import ProfilePicture from "../ProfilePicture";
import moment from 'moment';
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from "@react-navigation/native";

export type CommentProps = {
    comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const onDeleteComment = (commentId: string) => {
        console.warn('delete comment', commentId);
    } 

    const onPressProfile = () => {
        navigation.navigate('SingleProfile', {profileId: comment.profile.id});
    }

    return (
        <TouchableOpacity onPress={onPressProfile} onLongPress={() => setModalVisible(true)} activeOpacity={0.6} style={styles.commentContainer}>
                <ProfilePicture size={30} image={comment.profile.profile_picture} />
                <View style={styles.rightPart}>
                    <Text style={styles.username}>{comment.profile.first_name} {comment.profile.last_name}</Text>
                    <Text style={styles.commentText}>{comment.comment}</Text>
                    <Text style={styles.createdAt}>{moment(comment.created_at).fromNow()}</Text>
                </View>                                 
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
                        <TouchableOpacity onPress={() => onDeleteComment(comment.id)} style={styles.deleteBtn}>
                            <Text style={styles.deleteBtnText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default Comment;