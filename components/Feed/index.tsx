import React, { ComponentType } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import Post from '../Post';
import styles from './style';
import { PostType } from '../../types';

export type FeedProps = {
    Header: ComponentType | undefined,
    posts: PostType[] | null,
}


const Feed = ({ posts, Header }: FeedProps) => (
    <View style={styles.feedContainer}>
        {
            !posts ?
                <ActivityIndicator size="large" color="green" />
                :
                posts?.length !== 0 ?
                    <FlatList
                        data={posts}
                        renderItem={({ item }) => <Post post={item} />}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={Header}
                    />
                    :
                    <Text>No posts available</Text>
        }

    </View>
)

export default Feed;