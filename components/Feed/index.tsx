import React, { ComponentType, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import Post from '../Post';
import styles from './style';
import NewPostRow from '../NewPostRow';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../store/types';

export type FeedProps = {
    Header: ComponentType | undefined,
}


const Feed = ({ Header }: FeedProps) => {
    const { posts } = useSelector(mapStateToProps);


    return (<View style={styles.feedContainer}>
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={Header}
        />
    </View>)
}

const mapStateToProps = (state: StoreStateType) => ({
    posts: state.posts.posts,
    user: state.user.user
});


export default Feed;