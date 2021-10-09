import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import NewPostRow from '../components/NewPostRow';
import Feed from '../components/Feed';
import { View } from '../components/Themed';


import { CategoryType, PostType } from '../types';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { useNavigation } from '@react-navigation/core';
import { CATEGORY_POSTS_URL, CATEGORY_URL, TIMELINE_POSTS_URL } from '../urls';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { StoreStateType } from '../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostsList } from '../store/posts/actionCreators';

export default function HomeScreen() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [currentCat, setCurrentCat] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { posts } = useSelector(mapStateToProps);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const getAllCategories = async() => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: CATEGORY_URL,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError('Error occurred!');
    });

    if (response) {
      setCategories(response.data);
    } else {
      setCategories([]);
      setError('Error occurred!');
    }
  };

  const getPosts = async () => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    let url = TIMELINE_POSTS_URL;
    if (currentCat) {
      url = `${CATEGORY_POSTS_URL}/${currentCat}`
    }

    const response = await axiosHandler({
      url: url,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError('Error occurred!');
    });

    if (response) {
      dispatch(updatePostsList(response.data.results))
    } else {
      dispatch(updatePostsList([]))
      setError('Error occurred!');
    }

  }

  const onChangeCategory = (category: string) => {
    setCurrentCat(category);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getPosts();
  }, [currentCat]);

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
      <View style={styles.topBarLinksContainer}>
        <FlatList 
          data={categories || []}
          renderItem={({item}) => <TouchableOpacity style={{...styles.topBarLinksTouchable, borderBottomWidth: currentCat === item.name ? 1 : 0}} onPress={() => onChangeCategory(item.name)}>
            <Text style={styles.topBarText}>{item.name}</Text>
          </TouchableOpacity>}
          keyExtractor={(item) => String(item.id)} // should change the database id type from number to uuid (string)
          horizontal={true}
        />
      </View>
      <Feed Header={NewPostRow} />
    </View>
  );
}

const mapStateToProps = (state: StoreStateType) => ({
  posts: state.posts.posts,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec'
  },
  topBarLinksContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#c7c7c7',
    marginBottom: 5
  },
  topBarLinksTouchable: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderBottomColor: 'blue'
  },
  topBarText: {
    color: '#909090',
    fontWeight: 'bold',
  }
});
