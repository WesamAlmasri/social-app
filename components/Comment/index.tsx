import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import styles from "./style";
import { CommentType } from "../../types";
import ProfilePicture from "../ProfilePicture";
import moment from 'moment';
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from "@react-navigation/native";
import { axiosHandler, getData, tokenName, tokenType } from "../../helper";
import { COMMENT_URL } from "../../urls";

export type CommentProps = {
    comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const onDeleteComment = async(commentId: string) => {
        const tokenString = await getData(tokenName);
        if (!tokenString) {
            navigation.navigate('Login');
            return;
        }
        const token: tokenType = JSON.parse(tokenString);

        const response = await axiosHandler({
            url: `${COMMENT_URL}/${commentId}`,
            method: 'DELETE',
            token: token.access_token,
        })?.catch(e => null);

        if (response) {
        navigation.navigate('SinglePostScreen', {profileId: comment.profile.id});
        }
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
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => onDeleteComment(comment.id)} style={styles.deleteBtn}>
                                <Text style={styles.btnText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default Comment;