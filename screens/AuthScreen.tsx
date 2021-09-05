import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { Dispatch, useState, useEffect } from 'react';
import { View, Dimensions, Keyboard, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { storeData, tokenName } from '../helper';
import { SIGNUP_URL, SIGN_IN_URL } from '../urls';

export type AuthScreenProps = {
    register: boolean
}

type requestDataType = {
    email: string,
    username?: string,
    password: string
}



export const loginRequest = async (data: requestDataType, setError: Dispatch<string | null>, setLoading: Dispatch<boolean>, navigation: NavigationProp<any>) => {

    const result = await axios({
        method: 'post',
        url: SIGN_IN_URL,
        headers: { 'Content-Type': 'application/json' },
        auth: {
            username: data.email,
            password: data.password
        }
    }).catch(e => setError(e.response.data));

    
    if(result){
        console.log('The results is : ', result.data)
        storeData(tokenName, JSON.stringify(result.data));
        navigation.navigate('authController');
    } else {
        setLoading(false);
    }
};

export const registerRequest = async (data: requestDataType, setError: Dispatch<string | null>, setLoading: Dispatch<boolean>, navigation: NavigationProp<any>) => {
    const result = await axios({
        method: 'post',
        url: SIGNUP_URL,
        headers: { 'Content-Type': 'application/json' },
        data: {
            email: data.email,
            user_name: data.username,
            password: data.password
        }
    }).catch(e => setError(e.response.data.message));

    
    if(result){
        console.log('The results is : ', result.data)
        await loginRequest({
            email: data.email.toLocaleLowerCase(),
            password: data.password
        }, setError, setLoading, navigation);
    } else {
        setLoading(false);
    }
};

export default function AuthScreen({ register = false }: AuthScreenProps) {
    const [requestData, setRequestData] = useState<requestDataType>({ email: '', username: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

    const onSubmit = () => {
        setLoading(true);
        if (!requestData.email || !requestData.password) {
            Alert.alert(
                'Error',
                'The fields must be filled',
                [{
                    text: 'Ok',
                }]
            );
            setLoading(false);
            return;
        }

        setError(null);
        if(register){
            registerRequest(requestData, setError, setLoading, navigation);
        } else {
            loginRequest(requestData, setError, setLoading, navigation);
        }

    };


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
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        placeholderTextColor='#b7d4f9'
                        autoCompleteType="email"
                        keyboardType='email-address'
                        value={requestData.email}
                        onChangeText={(text) => setRequestData(prev => ({ ...prev, email: text }))}
                    />
                    {
                        register &&
                        <TextInput
                            style={styles.textInput}
                            placeholder="username"
                            placeholderTextColor='#b7d4f9'
                            value={requestData.username}
                            onChangeText={(text) => setRequestData(prev => ({ ...prev, username: text }))}
                        />
                    }
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor='#b7d4f9'
                        value={requestData.password}
                        onChangeText={(text) => setRequestData(prev => ({ ...prev, password: text }))}
                    />
                    {!register && <TouchableWithoutFeedback style={styles.forgetTextContainer}>
                        <Text style={styles.forgetText}> Forget password?</Text>
                    </TouchableWithoutFeedback>}
                    <TouchableOpacity disabled={loading} style={styles.mainBtn} onPress={onSubmit}>
                        <Text style={styles.btnText}> {loading ? 'Loading...' : register ? 'Register' : 'Login'}</Text>
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={register ? () => navigation.navigate('Login') : () => navigation.navigate('Register')}>
                            <Text style={styles.footerText}>{register ? 'Login Now' : 'Register now'}</Text>
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
    inputsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: '#5e99de',
        width: width_textInput,
        borderRadius: 40,
        paddingVertical: 10,
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
        marginTop: '20%',
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
