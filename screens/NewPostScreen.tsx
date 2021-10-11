import React, { useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Image, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../store/types';
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { CATEGORY_POSTS_URL, CATEGORY_URL, POST_URL, TIMELINE_POSTS_URL } from '../urls';
import { CategoryType } from '../types';
import { updatePostsList } from '../store/posts/actionCreators';

export default function NewPostScreen() {

  const navigation = useNavigation();
  const { user } = useSelector(mapStateToProps);
  const [postText, setPostText] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const dispatch = useDispatch();

  const onPickImage = async () => {
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

  const onOpenCamera = async () => {
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

  const onSubmitPost = async () => {
    setSubmitting(true);
    const formData = new FormData();
    if (image && image !== '') {
      // Infer the type of the image
      let filename: string = image.split('/').pop() || '';
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('image', {uri: image, name: filename, type});
    }
    formData.append('text', postText);
    formData.append('category_id', selectedCategory?.id || categories[0].id);

    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: POST_URL,
      method: 'POST',
      data: formData,
      extra: { 'Content-Type': 'multipart/form-data' },
      token: token.access_token,
    })?.catch(e => {
      setError(e.message);
    });

    if (response) {
      Alert.alert(
        'Success',
        'Your post has been shared.',
        [{
          text: 'Ok',
          onPress: () => navigation.navigate('HomeScreen')
        }]
      );
    }
    setSubmitting(false);
  }

  const getAllCategories = async () => {
    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: CATEGORY_URL,
      method: 'GET',
      token: token.access_token,
    })?.catch(e => {
      setError('Error occurred!');
    });

    if (response) {
      setCategories(response.data);
    } else {
      setCategories([]);
      setError('Error occurred!');
    }
  };

  const onCancel = () => {
    navigation.goBack();
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (error) {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <AntDesign color={Colors.light.tabIconDefault} size={30} name='closecircle' />
        </TouchableOpacity>
        <Text style={styles.username}>{user?.user?.username}</Text>
        <TouchableOpacity onPress={onSubmitPost} activeOpacity={0.8}>
          {
            submitting ? 
            <ActivityIndicator size="large" color="blue" />
            :
            <Ionicons color={postText === '' && image === '' ? Colors.light.tabIconDefault : Colors.light.tabIconSelected} size={35} name='arrow-up-circle' />
          }
        
        </TouchableOpacity>
      </View>
      <Text style={styles.catHeader}>Category</Text>
      <View style={styles.catContainer}>
        {
          categories.map(cat => <TouchableOpacity key={cat.id} style={{ ...styles.catItem, backgroundColor: selectedCategory?.name === cat.name ? 'blue' : '#eeeeee' }} onPress={() => setSelectedCategory(cat)}>
            <Text style={{ color: selectedCategory?.name === cat.name ? '#fff' : 'black' }}>{cat.name}</Text>
          </TouchableOpacity>)
        }
      </View>
      <KeyboardAvoidingView
        style={styles.bottomPart}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >

        <TextInput value={postText} onChangeText={setPostText} multiline={true} style={styles.postInput} placeholder={"What's new?"} />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.pickImageButton} onPress={onPickImage} activeOpacity={0.8}>
            <Ionicons color={postText === '' && image === '' ? '#a6a6a6' : 'blue'} size={30} name='image-outline' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickImageButton} onPress={onOpenCamera} activeOpacity={0.8}>
            <Ionicons color={postText === '' && image === '' ? '#a6a6a6' : 'blue'} size={30} name='camera-outline' />
          </TouchableOpacity>
        </View>
        {
          image !== '' &&
          <View style={styles.inputContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state: StoreStateType) => ({
  user: state.user.user,
});

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
  bottomPart: {
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
  },
  catItem: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  catHeader: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  catContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    width: '50%',
    height: 100,
    resizeMode: 'contain'
  },
});
