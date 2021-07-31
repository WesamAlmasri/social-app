import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './style';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ProfileType, UserFileType } from '../../types';

export type SearchBarProps = {
    
}

const SearchBar = ({}: SearchBarProps) => {

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder='Search'>
                <Ionicons name='search' />
                <Feather name='x' />
            </TextInput>
        </View>
    )
}

export default SearchBar;