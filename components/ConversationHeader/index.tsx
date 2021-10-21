import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';
import ProfilePicture from '../ProfilePicture';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { updateOtherProfileUsername } from '../../store/userDetails/actionCreators';
import { useDispatch } from 'react-redux';

export type ConversationHeaderProps = {
    profile: ProfileType<UserFileType>,
}

const ConversationHeader = ({ profile }: ConversationHeaderProps) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    if(!profile){
        return <Text>Loader</Text>
    }

    const onPressProfile = () => {
        dispatch(updateOtherProfileUsername(profile));
        navigation.navigate('SingleProfile');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressProfile}>
                <ProfilePicture size={35} image={profile.profile_picture?.link} />
            </TouchableOpacity>
            <View style={styles.rightSide}>
                <Text style={styles.username}>{profile.user?.username}</Text>
                <View style={styles.onlineStatus}>
                    {profile.user?.last_login && <Text style={styles.onlineText}>
                        {
                            (new Date().getTime() - new Date(profile.user?.last_login).getTime()) / 1000 <= 60 ? 'online' : 'offline'
                        }
                    </Text>}
                    <FontAwesome color='grey' name='mobile-phone' />
                </View>
            </View>
        </View>
    )
}

export default ConversationHeader;