import React, { ComponentType } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import Post from '../Post';
import styles from './style';
import { PostType } from '../../types';
import NewPostRow from '../NewPostRow';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../store/types';

export type FeedProps = {
    Header: ComponentType | undefined,
}


const Feed = ({ Header }: FeedProps) => {
    const { posts } = useSelector(mapStateToProps);
    
    return (<View style={styles.feedContainer}>
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
                    <>
                        <NewPostRow />
                        <Text style={styles.noPostText}>No posts available</Text>
                    </>
        }

    </View>)
}

const mapStateToProps = (state: StoreStateType) => ({
    posts: state.posts.posts,
});


export default Feed;