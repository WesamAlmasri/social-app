import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { axiosHandler, getData, tokenName, tokenType } from '../../helper';
import { FOLLOW_URL } from '../../urls';
import { updateOtherProfileDetails } from '../../store/userDetails/actionCreators';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
    meProfile: boolean | undefined
}

const ProfileOptions = ({ profile, meProfile }: ProfileHeaderProps) => {
    const [submittingFollow, setSubmittingFollow] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPressEdit = () => {
        navigation.navigate('EditProfileScreen', { profile: profile });
    }

    const onPressConversation = () => {
        navigation.navigate('ConversationScreen', { receiverId: profile.id });
    }

    const onToggleFollow = async() => {
        await toggleFollow();
    }

    const toggleFollow = async () => {
        setSubmittingFollow(true);
        const tokenString = await getData(tokenName);
        if (!tokenString) {
            navigation.navigate('Login');
            return;
        }
        const token: tokenType = JSON.parse(tokenString);

        const response = await axiosHandler({
            url: FOLLOW_URL,
            method: 'POST',
            data: { following: profile.id },
            token: token.access_token,
        })?.catch(e => {
            setSubmittingFollow(false);
            setError(e.message);
        });

        if (response) {
            dispatch(updateOtherProfileDetails({
                ...profile,
                am_follow: !profile.am_follow,
                followers: profile.followers ? (profile.am_follow ? profile.followers - 1 : profile.followers + 1) : profile.followers
            }));
        } else {
            setError('Error occurred!');
        }
        setSubmittingFollow(false);
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
    }, [error]);

    return (
        <View style={styles.container}>
            {
                meProfile ?
                    <TouchableOpacity onPress={onPressEdit} activeOpacity={0.7} style={styles.editButton}>
                        <Text style={styles.editText}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                    :
                    <>
                        <TouchableOpacity onPress={onToggleFollow} style={{ ...styles.followButton, backgroundColor: profile.am_follow ? '#f1f1f1' : '#2f95dc' }}>
                            <Text style={{ ...styles.followText, color: profile.am_follow ? '#2f95dc' : '#f1f1f1' }}>
                                {
                                    submittingFollow ? <ActivityIndicator color='green' /> : (profile.am_follow ? 'unFollow' : 'Follow')
                                }
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressConversation} style={{ ...styles.followButton, backgroundColor: '#2f95dc', marginTop: 5 }}>
                            <Text style={{ color: '#f1f1f1' }}>Send a message</Text>
                        </TouchableOpacity>
                    </>


            }
        </View>
    )
}

export default ProfileOptions;