import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Dimensions, Keyboard, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { REQUEST_USER_VERIFY_CODE_URL, VERIFY_USER_ACCOUNT_URL } from '../urls';

export type VerificationCodeScreenProps = {
    
}


export default function VerificationCodeScreen({ }: VerificationCodeScreenProps) {
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

    const onSubmit = async (navigation: NavigationProp<any>) => {
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

        const tokenString = await getData(tokenName);
        if (!tokenString) {
            navigation.navigate('Login');
            return;
        }
        const token: tokenType = JSON.parse(tokenString);

        const response = await axiosHandler({
            url: VERIFY_USER_ACCOUNT_URL,
            method: 'POST',
            data: {
                code: code
            },
            token: token.access_token,
        })?.catch(e => {
            setError(e.message);
        });

        if(response){
            navigation.navigate('authController');
        } else {
            setError('Something went error, try again!');
        }

    };

    const codeRequest = async (navigation: NavigationProp<any>) => {
        const tokenString = await getData(tokenName);
        if (!tokenString) {
            navigation.navigate('Login');
            return;
        }
        const token: tokenType = JSON.parse(tokenString);

        const response = await axiosHandler({
            url: REQUEST_USER_VERIFY_CODE_URL,
            method: 'POST',
            token: token.access_token,
        })?.catch(e => {
            setError(e.message);
        });

        if(response){
            Alert.alert(
                'Code sent',
                'The code has been sent successfully to your email, you can verify it within 10 min',
                [{
                    text: 'Ok',
                    onPress: () => setError(null)
                }]
            );
        }

    }

    useEffect(() => {
        (async() => await codeRequest(navigation))();
    }, []);

    useEffect(() => {
        if(error){
            Alert.alert(
                'Error',
                error,
                [{
                    text: 'Ok',
                    onPress: () => setError(null)
                }]
            );
        }
    }, [error])


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
                    <TouchableOpacity style={styles.mainBtn} onPress={() => onSubmit(navigation)}>
                        <Text style={styles.btnText}> Verify</Text>
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={() => codeRequest(navigation)}>
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
