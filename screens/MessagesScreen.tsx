import * as React from 'react';
import { StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { View, FlatList } from 'react-native';

// Dummy Data
import profilesWithMessages from '../data/profilesWithMessages';
import SingleProfileWithMessageRow from '../components/SingleProfileWithMessageRow';

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.resultsContainer}>
        <FlatList data={profilesWithMessages} renderItem={({item}) => <SingleProfileWithMessageRow profileWithMessage={item} />} />
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
      
  }
});
