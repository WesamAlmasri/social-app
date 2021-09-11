import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text } from 'react-native';
import NewPostRow from '../components/NewPostRow';
import Feed from '../components/Feed';
import { View } from '../components/Themed';

// Dummy Data
import { CategoryType, PostType } from '../types';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { useNavigation } from '@react-navigation/core';
import { CATEGORY_POSTS_URL, TIMELINE_POSTS_URL } from '../urls';

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation();

  const getPosts = async (category: CategoryType | null = null) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    let url = TIMELINE_POSTS_URL;
    if (category) {
      url = `${CATEGORY_POSTS_URL}/${category}`
    }

    const response = await axiosHandler({
      url: url,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError('Error occurred!');
    });

    if (response) {
      setPosts(response.data.results);
    } else {
      setError('Error occurred!');
    }

  }


  useEffect(() => {
    getPosts();
  }, []);

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


  if (!posts) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {posts?.length !== 0 ? <Feed Header={NewPostRow} posts={posts} /> : <Text>No posts available</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec'
  },
});
