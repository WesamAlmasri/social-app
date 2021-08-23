import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';
import { useNavigation } from '@react-navigation/native';

export type ProfileHeaderProps = {
    profile: ProfileType<UserFileType>,
    meProfile: boolean | undefined
}

const ProfileOptions = ({ profile, meProfile }: ProfileHeaderProps) => {
    const [amFollow, setAmFollow] = useState(profile.am_follow);

    const navigation = useNavigation();

    const onPressEdit = () => {
        navigation.navigate('EditProfileScreen', {profile: profile});
    }

    const onPressConversation = () => {
        navigation.navigate('ConversationScreen', {receiverId: profile.id});
    }

    const onToggleFollow = () => {
        setAmFollow(!amFollow);
    }

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
                        <TouchableOpacity onPress={onToggleFollow} style={{ ...styles.followButton, backgroundColor: amFollow ? '#f1f1f1' : '#2f95dc' }}>
                            <Text style={{ ...styles.followText, color: amFollow ? '#2f95dc' : '#f1f1f1' }}>
                                {
                                    amFollow ? 'unFollow' : 'Follow'
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