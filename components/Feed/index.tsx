import React from 'react';
import { View, FlatList } from 'react-native';
import Post from '../Post';
import styles from './style';
import NewPostRow from '../NewPostRow';
import { PostType } from '../../types';

export type FeedProps = {
  posts: PostType[],
  profile: boolean,
}


const Feed = ({ posts, profile }: FeedProps) => (
    <View style={styles.feedContainer}>
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={!profile ? NewPostRow : null}
        />
    </View>
)

export default Feed;