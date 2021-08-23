import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import ConversationHeader from '../components/ConversationHeader';
import ConversationInterface from '../components/ConversationInterface';
import SendMessageBar from '../components/SendMessageBar';
import Colors from '../constants/Colors';

// Dummy Data
import chatConversation from '../data/chatConversation';
import profiles from '../data/profiles';

export type ConversationScreenProps = {
  receiverId: string
}

export default function ConversationScreen({ receiverId }: ConversationScreenProps) {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.8}>
          <Ionicons color={Colors.light.tabIconSelected} size={30} name='md-chevron-back' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Back</Text>
        <ConversationHeader profile={profiles[0]} />
      </View>
      <ConversationInterface conversation={chatConversation} />
      <SendMessageBar receiverId={receiverId} />
    </SafeAreaView>
  );
}

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
    transform: [{translateX: -10}]
  },
});
