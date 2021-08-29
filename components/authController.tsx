import React, { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { axiosHandler, getData, logout, storeData, tokenName, tokenType } from '../helper';
import { ME_URL, REFRESH_URL } from '../urls';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../store/userDetails/actionCreators';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DispatchType } from '../store/userDetails/types';
import { Dispatch } from 'react';
import { updateActiveChatUser } from '../store/chat/actionCreators';
import { ActivityIndicator, View } from 'react-native';


export const checkAuth = async (setChecking: Dispatch<boolean>, dispatch: DispatchType, source: CancelTokenSource, navigation: NavigationProp<any>) => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
        await logout(dispatch, source, navigation);
        return;
    }

    const token: tokenType = JSON.parse(tokenString);

    let isCanceled: boolean = false;
    const userProfile = await axiosHandler({
        url: ME_URL,
        method: 'GET',
        token: token.access_token,
        cancelToken: source.token
    })?.catch(e => {
        if (axios.isCancel(e)) { isCanceled = true; };
        if (e.response.data.status === 403 && e.response.data.message === 'Account not verified!') {
            navigation.navigate('VerificationCode');
            return;
        }
    });


    if (userProfile) {
        dispatch(updateUserDetails(userProfile.data));
        setChecking(false);
        navigation.navigate('Main');
    } else {
        const newAccessToken = await axiosHandler({
            url: REFRESH_URL,
            method: 'POST',
            data: {
                refresh_token: token.refresh_token
            },
            cancelToken: source.token
        })?.catch((e) => { if (axios.isCancel(e)) { isCanceled = true; } });

        if (newAccessToken) {
            await storeData(tokenName, JSON.stringify(newAccessToken.data));
            checkAuth(setChecking, dispatch, source, navigation);
        } else {
            if (!isCanceled) await logout(dispatch, source, navigation);
        }
    }
}


const AuthController = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    
    useEffect(() => {
        const source = axios.CancelToken.source();
        
        dispatch(updateActiveChatUser(null));
        checkAuth(()=>null, dispatch, source, navigation);

        return () => {
            source.cancel("authController cancellation request");
        }
    }, []);


    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="green" />
        </View>
    );     
};

export default AuthController;