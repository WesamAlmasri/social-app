import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { ProfileType, UserFileType } from '../../types';

export type SingleProfileRowProps = {
    
}

const SingleProfileRow = ({}: SingleProfileRowProps) => {

    return (
        <View style={styles.container}>
            <Text>Single Profile Row</Text>
        </View>
    )
}

export default SingleProfileRow;