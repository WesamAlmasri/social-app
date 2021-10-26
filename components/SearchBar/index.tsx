import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import { Ionicons, Feather } from '@expo/vector-icons';

export type SearchBarProps = {
    onChangeKeyword: Function
}

const SearchBar = ({onChangeKeyword}: SearchBarProps) => {
    const [searchText, setSearchText] = useState('');

    const onChangeText = async(text: string) => {
        setSearchText(text);
        await onChangeKeyword(text);
    }

    const onClearPress = () => {
        setSearchText('');
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