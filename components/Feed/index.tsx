import React, { ComponentType } from 'react';
import { View, FlatList } from 'react-native';
import Post from '../Post';
import styles from './style';
import { PostType } from '../../types';

export type FeedProps = {
  Header: ComponentType | undefined,
  posts: PostType[],
}


const Feed = ({ posts, Header }: FeedProps) => (
    <View style={styles.feedContainer}>
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={Header}
        />
    </View>
)

export default Feed;