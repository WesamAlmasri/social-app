import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import Colors from '../constants/Colors';
import { useRoute } from '@react-navigation/native';
import singlePost from '../data/singlePost';
import comments from '../data/comments';
import Comment from '../components/Comment';

export default function SinglePostScreen(  ) {

  const route = useRoute();
  // console.log('route ', route.params?.postId);

  return (
    <SafeAreaView style={styles.container}>
      <Post post={singlePost} />
      <View style={styles.commentSection}>
      <Comment comment={comments[0]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  commentSection:{
    borderTopWidth: 0.5,
    borderTopColor: '#e7e7e7',
    flex: 1,
    width: '100%',
    padding: 10
  }
});
