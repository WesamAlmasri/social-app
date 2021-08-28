import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Dimensions, Keyboard, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export type VerificationCodeScreenProps = {
    
}


export default function VerificationCodeScreen({ }: VerificationCodeScreenProps) {
    const [code, setCode] = useState<string>('');
    const navigation = useNavigation();

    const onSubmit = () => {
        // setLoading(true);
        if (!code) {
            Alert.alert(
                'Error',
                'The fields must be filled',
                [{
                    text: 'Ok',
                }]
            );
            // setLoading(false);
            return;
        }

        console.warn('code : ', code);

    };

    const codeRequest = () => {
        console.warn('send code request')
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 320 : 0} style={styles.container}>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
                <View style={styles.inputsContainer}>
                    <Text style={styles.logoText}>H</Text>
                    <Text style={styles.mainText}>A verification code has been sent to you email, write it down within ten minute to verify the account.</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Code"
                        placeholderTextColor='#b7d4f9'
                        value={code}
                        onChangeText={setCode}
                    />
                    <TouchableOpacity style={styles.mainBtn} onPress={onSubmit}>
                        <Text style={styles.btnText}> Send the code</Text>
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={codeRequest}>
                            <Text style={styles.footerText}>Send the code again!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
    );
}

const { width, height } = Dimensions.get('window');
const logo_size = width * 0.3;
const width_textInput = width * 0.8;
const width_mainBtn = width * 0.6

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4780c3',
    },
    logoText: {
        fontSize: logo_size,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: '20%'
    },
    mainText: {
        margin: '5%',
        color: '#fff'
    },
    inputsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: '#5e99de',
        width: width_textInput,
        borderRadius: 40,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 5,
        color: '#fff'
    },
    forgetTextContainer: {
        marginVertical: 10
    },
    forgetText: {
        color: '#90b9e5'
    },
    mainBtn: {
        marginTop: '10%',
        width: width_mainBtn,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#fff'
    },
    btnText: {
        color: '#769ecc',
        fontWeight: 'bold',
        fontSize: 20
    },
    footerContainer: {
        marginTop: 40
    },
    footerText: {
        color: '#fff',
        fontSize: 16
    }
});
