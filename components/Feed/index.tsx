import React, { ComponentType } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import Post from '../Post';
import styles from './style';
import { PostType } from '../../types';
import NewPostRow from '../NewPostRow';

export type FeedProps = {
    Header: ComponentType | undefined,
    posts: PostType[] | null,
    deletePosts: Function
}


const Feed = ({ posts, Header, deletePosts }: FeedProps) => (
    <View style={styles.feedContainer}>
        {
            !posts ?
                <ActivityIndicator size="large" color="green" />
                :
                posts?.length !== 0 ?
                    <FlatList
                        data={posts}
                        renderItem={({ item }) => <Post post={item} deletePosts={deletePosts} />}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={Header}
                    />
                    :
                    <>
                        <NewPostRow />
                        <Text style={styles.noPostText}>No posts available</Text>
                    </>
        }

    </View>
)

export default Feed;