import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NewPostRow = () => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('NewPostScreen');
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