import React from 'react';
import { View, FlatList } from 'react-native';
import posts from '../../data/posts';
import Post from '../Post';
import styles from './style';
import NewPostRow from '../NewPostRow';

const Feed = () => (
    <View style={styles.feedContainer}>
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={NewPostRow}
        />
    </View>
)

export default Feed;