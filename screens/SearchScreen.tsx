import * as React from 'react';
import { StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import SingleProfileRow from '../components/SingleProfileRow';
import { View, FlatList } from 'react-native';

// Dummy Data
import profiles from '../data/profiles';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.resultsContainer}>
        <FlatList data={profiles} renderItem={({item}) => <SingleProfileRow key={item.id} profile={item} />} />
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
