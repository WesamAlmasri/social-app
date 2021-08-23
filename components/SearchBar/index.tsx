import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ProfileType, UserFileType } from '../../types';

export type SearchBarProps = {
    
}

const SearchBar = ({}: SearchBarProps) => {
    const [searchText, setSearchText] = useState('');

    const onChangeText = (text: string) => {
        setSearchText(text);
    }

    const onClearPress = () => {
        setSearchText('');
        console.warn('text cleared');
    }


    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <Ionicons style={styles.searchIcon} color='#b1b1b1' name='search' size={20} />
                <TouchableOpacity onPress={onClearPress}>
                    <Feather style={styles.xIcon} color='#b1b1b1' name='x' size={20} />
                </TouchableOpacity>
                <TextInput value={searchText} onChangeText={onChangeText} style={styles.textInput} placeholder='Search' />
            </View>
        </View>
    )
}

export default SearchBar;