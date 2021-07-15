import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';

export default function NewPostScreen() {

  const navigation = useNavigation();

  const [postText, setPostText] = useState('');
  const [images, setImage] = useState('');

  const onPickImage = async() => {
    // Ask for permission
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const onOpenCamera = async() => {
    // Ask for permission
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const onSubmitPost = () => {
    console.warn('Pressed', postText);
  }

  const onCancel = () => {
    navigation.goBack();
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <AntDesign color={Colors.light.tabIconDefault} size={30} name='closecircle' />
        </TouchableOpacity>
        <Text style={styles.username}>Tamara</Text>
        <TouchableOpacity onPress={onSubmitPost} activeOpacity={0.8}>
          <Ionicons color={postText === '' && images.length === 0 ? Colors.light.tabIconDefault : Colors.light.tabIconSelected} size={35} name='arrow-up-circle' />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.bottomPart}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >

        <TextInput value={postText} onChangeText={setPostText} multiline={true} style={styles.postInput} placeholder={"What's new?"} />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.pickImageButton} onPress={onPickImage} activeOpacity={0.8}>
            <Ionicons color={'#a6a6a6'} size={30} name='image-outline' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickImageButton} onPress={onOpenCamera} activeOpacity={0.8}>
            <Ionicons color={'#a6a6a6'} size={30} name='camera-outline' />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#d0d0d0',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20
  },
  bottomPart:{
    flex: 1,
    width: '100%' 
  },
  postInput: {
    padding: 15,
    fontSize: 22,
    width: '100%',
    flex: 1,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    padding: 5,
    borderTopColor: '#d0d0d0'
  },
  pickImageButton: {
    marginRight: 15
  }
});
