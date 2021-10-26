import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { View, FlatList } from 'react-native';


import SingleProfileWithMessageRow from '../components/SingleProfileWithMessageRow';
import { useIsFocused } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { ProfileWithMessageType, UserFileType } from '../types';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { PROFILES_WITH_MESSAGES_URL } from '../urls';

export default function MessagesScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [profileList, setProfileList] = useState<ProfileWithMessageType<UserFileType>[]>([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getProfileLists = async (keyword: string) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    let url = PROFILES_WITH_MESSAGES_URL;
    if (keyword && keyword !== '') {
      url = url + `/?keyword=${keyword}`;
    }

    const response = await axiosHandler({
      url: url,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError(e.message);
    });

    if (response) {
      setProfileList(response.data.results);
    } else {
      setError('Error occurred!');
    }
  }

  useEffect(() => {
    if(isFocused){
      setLoading(true);
      getProfileLists(keyword);
      setLoading(false);
    }
  }, [isFocused]);

  useEffect(() => {
    getProfileLists(keyword);
  }, [keyword]);

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <SearchBar onChangeKeyword={setKeyword} />
      <View style={styles.resultsContainer}>
        <FlatList data={profileList} renderItem={({item}) => <SingleProfileWithMessageRow profileWithMessage={item} />} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  resultsContainer: {
      flex: 1
  }
});
