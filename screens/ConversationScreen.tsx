import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ConversationHeader from '../components/ConversationHeader';
import ConversationInterface from '../components/ConversationInterface';
import SendMessageBar from '../components/SendMessageBar';
import Colors from '../constants/Colors';

// Dummy Data
import { MessageType, ProfileType, UserFileType } from '../types';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { MESSAGES_URL, PROFILE_URL } from '../urls';
import { updateActiveChatUser } from '../store/chat/actionCreators';
import { StoreStateType } from '../store/types';

export type ConversationScreenProps = {

}

export default function ConversationScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const [chatConversation, setChatConversation] = useState<MessageType[]>([]);
  const [profile, setProfile] = useState<ProfileType<UserFileType>>();
  const route: RouteProp<{ params: { receiverUsername: ConversationScreenProps } }, 'params'> = useRoute();
  const dispatch = useDispatch();
  const { user } = useSelector(mapStateToProps);

  const getProfile = async () => {
    setLoading(true);
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    let url = `${PROFILE_URL}/${route.params.receiverUsername}`;

    const response = await axiosHandler({
      url: url,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError(e.message);
    });

    if (response) {
      setProfile(response.data);
      dispatch(updateActiveChatUser(response.data));
    } else {
      setError('Error occurred!');
    }

    setLoading(false);
  }

  const getConversation = async () => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);


    const response = await axiosHandler({
      url: `${MESSAGES_URL}/${profile?.id}`,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError(e.message);
    });

    if (response) {
      setChatConversation(response.data.results.reverse());
    } else {
      setError('Error occurred!');
    }
  }

  const handleSeenChat = async (messageId: string) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: `${MESSAGES_URL}/${messageId}`,
      method: 'PUT',
      token: token.access_token,
    })?.catch(e => {
      setError(e.message);
    });

    if (response) {

    } else {
      setError('Error occurred!');
    }
  }

  const onBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    getProfile();
  }, [])

  useEffect(() => {
    if (profile) {
      getConversation();
    }
  }, [profile])

  useEffect(() => {
    chatConversation?.map(chat => {
      if(chat.receiver_id === user?.id){
        handleSeenChat(chat.id);
      }
    })
  }, [chatConversation])

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        error,
        [{
          text: 'Ok',
          onPress: () => navigation.goBack()
        }]
      );
    }
  }, [error]);

  if (loading || !profile) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.8}>
          <Ionicons color={Colors.light.tabIconSelected} size={30} name='md-chevron-back' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Back</Text>
        <ConversationHeader profile={profile} />
      </View>
      <ConversationInterface conversation={chatConversation} />
      <SendMessageBar addChatToConversation={(message: MessageType) => setChatConversation(prev => [...prev, message])} receiverId={profile?.id ? profile?.id : ''} />
    </SafeAreaView>
  );
}

const mapStateToProps = (state: StoreStateType) => ({
  user: state.user.user
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -10 }]
  },
});
