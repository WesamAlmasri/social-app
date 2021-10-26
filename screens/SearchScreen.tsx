import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import SingleProfileRow from '../components/SingleProfileRow';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';

import { ProfileType, UserFileType } from '../types';
import { PROFILE_URL } from '../urls';

export default function SearchScreen() {
  const [error, setError] = useState<string | null>(null);
  const [profileList, setProfileList] = useState<ProfileType<UserFileType>[]>([]);
  const navigation = useNavigation();

  const getProfileLists = async (keyword: string) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    let url = PROFILE_URL;
    if (keyword && keyword !== '') {
      url = url + `/?keyword=${keyword}`;
    }

    const response = await axiosHandler({
      url: url,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError('Error occurred!');
    });

    if (response) {
      setProfileList(response.data.results);
    } else {
      setError('Error occurred!');
    }
  }

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
      <SearchBar onChangeKeyword={getProfileLists} />
      <View style={styles.resultsContainer}>
        <FlatList data={profileList} renderItem={({ item }) => <SingleProfileRow key={item.id} profile={item} />} />
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
