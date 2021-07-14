import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { Ionicons } from '@expo/vector-icons';

const NewPostRow = () => {
    const onPress = () => {
        console.warn('Open new post');
    }

    return (
        <View style={styles.NewPostRowContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.newPostButton}>
                <Ionicons color={'#2e97dc'} size={25} name='create-outline' />
                <Text style={styles.buttonText}>Create Post</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewPostRow;