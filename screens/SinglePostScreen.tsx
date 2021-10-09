import React, { useState } from 'react';
import { Platform, StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import Post from '../components/Post';
import { useRoute } from '@react-navigation/native';
import { RouteProp, useNavigation } from '@react-navigation/core';
import Comment from '../components/Comment';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { CommentType, PostType } from '../types';

import { useEffect } from 'react';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { COMMENT_URL } from '../urls';
import { StoreStateType } from '../store/types';
import { useSelector } from 'react-redux';


export default function SinglePostScreen() {
  const [commentText, setCommentText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const route: RouteProp<{ params: { postId: string } }, 'params'> = useRoute();
  const navigation = useNavigation();
  const { posts } = useSelector(mapStateToProps);

  const onSubmitComment = async () => {
    if (!commentText || commentText.trim() === '') {
      Alert.alert(
        'Error',
        'The Comment field is empty!',
        [{
          text: 'Ok',
        }]
      );
      return;
    }

    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: `${COMMENT_URL}`,
      method: 'POST',
      data: {
        post_id: route.params.postId, comment: commentText
      },
      token: token.access_token,
    })?.catch(e => setError(e.response.data));

    if (response) {
      setCommentText('');
      setComments(prev => [...prev, response.data]);
    }
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

    const response = await axiosHandler({
      url: `${COMMENT_URL}/${route.params.postId}`,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => setError(e.response.data));

    if (response) {
      setComments(response.data.results);
    }
  }

  const onChangeComments = (action: string = 'new', comment: CommentType) => {
    let newCommentsList: CommentType[] = comments;
    if (action === 'new') {
      newCommentsList = [...newCommentsList, comment];
    } else if (action === 'delete') {
      newCommentsList = newCommentsList.filter(item => item.id !== comment.id);
    }
    setComments(newCommentsList);
  }

  useEffect(() => {
    const currentPost: PostType | undefined = posts.find(post => post.id === route.params.postId);
    if(!currentPost){
      navigation.goBack();
      return;
    }
    setPost(currentPost);
    getComments();
  }, [posts])

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

  if (!post) {
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
        ListHeaderComponent={() => <Post post={post} single />}
        data={comments}
        renderItem={({ item }) => <Comment key={item.id} comment={item} onChangeComments={onChangeComments} />}
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

const mapStateToProps = (state: StoreStateType) => ({
  posts: state.posts.posts,
});

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
    transform: [{ translateX: -10 }]
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
