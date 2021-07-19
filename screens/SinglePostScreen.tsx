import React, { useState } from 'react';
import { Platform, StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import Post from '../components/Post';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import singlePost from '../data/singlePost';
import comments from '../data/comments';
import Comment from '../components/Comment';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';



export default function SinglePostScreen() {
  const [commentText, setCommentText] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  // console.log('route ', route.params?.postId);

  const onSubmitComment = () => {
    console.warn('Pressed', commentText);
  }

  const onCancel = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <Ionicons color={Colors.light.tabIconSelected} size={30} name='md-chevron-back' />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={() => <Post post={singlePost} />}
        data={comments}
        renderItem={({ item }) => <Comment key={item.id} comment={item} />}
        style={styles.commentSection}
      />
      <KeyboardAvoidingView
        style={styles.newCommentSection}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <TextInput
          style={styles.commentInput}
          onChangeText={text => setCommentText(text)}
          value={commentText}
          placeholder='Write a comment'
        />
        <TouchableOpacity onPress={onSubmitComment} activeOpacity={0.8}>
          <Ionicons color={commentText === '' ? Colors.light.tabIconDefault : Colors.light.tabIconSelected} size={35} name='arrow-up-circle' />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#d0d0d0',
  },
  commentSection: {
    width: '100%',
    padding: 10
  },
  newCommentSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    padding: 5,
    borderTopColor: '#d0d0d0'
  },
  commentInput: {
    padding: 10,
    flex: 1,
    backgroundColor: '#ebebeb',
    borderRadius: 20,
    margin: 5,
  }
});
