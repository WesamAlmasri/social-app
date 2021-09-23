import React, { useState } from 'react';
import { Platform, StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import Post from '../components/Post';
import { useRoute } from '@react-navigation/native';
import { RouteProp, useNavigation } from '@react-navigation/core';
import Comment from '../components/Comment';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { CommentType, PostType } from '../types';

// Dummy Data
import singlePost from '../data/singlePost';
import commentsData from '../data/comments';
import { useEffect } from 'react';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { COMMENT_URL } from '../urls';


export default function SinglePostScreen() {
  const [commentText, setCommentText] = useState('');
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const route: RouteProp<{ params: { post: PostType } }, 'params'> = useRoute();
  const navigation = useNavigation();

  const onSubmitComment = () => {
    console.warn('Pressed', commentText);
  }

  const onCancel = () => {
    navigation.goBack();
  }

  const getComments = async () => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
        navigation.navigate('Login');
        return;
    }
    const token: tokenType = JSON.parse(tokenString);

    let url = COMMENT_URL

    const response = await axiosHandler({
        url: `${COMMENT_URL}/${route.params.post.id}`,
        method: 'GET',
        token: token.access_token,
    })?.catch(e => null);

    if (response) {
      setComments(response.data.results);
    }
}

  useEffect(() => {
    setPost(route.params.post);
    getComments();
  }, [])

  if(!post){
    return <Text>Loader</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <Ionicons color={Colors.light.tabIconSelected} size={30} name='md-chevron-back' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
      </View>
      <FlatList
        ListHeaderComponent={() => <Post post={post} />}
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
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#d0d0d0',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -10}]
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
