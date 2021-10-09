import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { PostType } from '../../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import styles from './style';
import moment from 'moment';
import Feather from '@expo/vector-icons/Feather'
import ProfilePicture from '../../ProfilePicture';
import { useNavigation } from '@react-navigation/native';
import { axiosHandler, getData, tokenName, tokenType } from '../../../helper';
import { POST_URL } from '../../../urls';
import { StoreStateType } from '../../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../store/posts/actionCreators';

export type PostHeaderProps = {
    post: PostType,
    single?: boolean
}

const PostHeader = ({ post,single }: PostHeaderProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const userProfile = useSelector(mapStateToProps);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onDeletePost = async (postId: string) => {
        setLoading(true);
        const tokenString = await getData(tokenName);
        if (!tokenString) {
            navigation.navigate('Login');
            return;
        }
        const token: tokenType = JSON.parse(tokenString);

        const response = await axiosHandler({
            url: `${POST_URL}/${postId}`,
            method: 'DELETE',
            token: token.access_token,
        })?.catch(e => {
            setError(e.message);
            setLoading(false);
        });

        if (response) {
            if(single){
                navigation.navigate('HomeScreen');
            }
            dispatch(deletePost(postId));
        }
        setLoading(false);
        setModalVisible(false);
    }

    const onPressProfile = () => {
        navigation.navigate('SingleProfile', { profileId: post.profile.id });
    }

    useEffect(() => {
        if (error) {
            Alert.alert(
                'Error',
                error,
                [{
                    text: 'Ok',
                    onPress: () => setError(null)
                }]
            );
        }
    }, [error])

    return (
        <View style={styles.postHeaderContainer}>
            <TouchableOpacity onPress={onPressProfile}>
                <ProfilePicture size={50} image={post.profile.profile_picture?.link} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressProfile} style={styles.middle}>
                <Text style={styles.username}>{post.profile.first_name} {post.profile.last_name}</Text>
                <Text style={styles.createdAt}>{moment(post.created_at).fromNow()}</Text>
            </TouchableOpacity>
            {
                userProfile.user?.id === post.profile.id &&
                <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.6}>
                    <MaterialCommunityIcons style={styles.threeDotsIcon} size={30} color={Colors.light.tabIconDefault} name='dots-vertical' />
                </TouchableOpacity>
            }
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
                            <TouchableOpacity onPress={() => (async () => await onDeletePost(post.id))()} style={styles.deleteBtn}>
                                <Text style={styles.btnText}>{loading ? <ActivityIndicator color='white' /> : 'Delete'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const mapStateToProps = (state: StoreStateType) => ({
    user: state.user.user,
});

export default PostHeader;