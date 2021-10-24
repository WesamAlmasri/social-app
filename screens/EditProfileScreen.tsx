import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Text, View, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


// Dummy Data
import { axiosHandler, getData, tokenName, tokenType } from '../helper';
import { FILE_URL, PROFILE_URL } from '../urls';
import { useDispatch, useSelector } from 'react-redux';
import { updateOtherProfileDetails, updateUserDetails } from '../store/userDetails/actionCreators';
import { StoreStateType } from '../store/types';


export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, profile } = useSelector(mapStateToProps);

  const [profilePic, setProfilePic] = useState(user?.profile_picture?.link);
  const [profileInfo, setProfileInfo] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    caption: user?.caption,
    profile_picture: user?.profile_picture?.id
  });
  const [error, setError] = useState<string | null>(null);
  const [submittingImage, setSubmittingImage] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onChange = (value: string, field: string) => {
    setProfileInfo({ ...profileInfo, [field]: value });
  }

  const uploadImage = async () => {
    setSubmittingImage(true);
    const formData = new FormData();
    if (profilePic && profilePic !== '') {
      // Infer the type of the image
      let filename: string = profilePic.split('/').pop() || '';
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('file', { uri: profilePic, name: filename, type });
    }

    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);

    const response = await axiosHandler({
      url: FILE_URL,
      method: 'POST',
      data: formData,
      extra: { 'Content-Type': 'multipart/form-data' },
      token: token.access_token,
    })?.catch(e => {
      setProfilePic(user?.profile_picture?.link);
      setSubmittingImage(false);
      setError(e.message);
    });

    if (response) {
      setSubmittingImage(false);
      return response.data[0].id;
    }
  }

  const updateProfileInfo = async () => {
    setSubmitting(true);

    const profileImageId = await uploadImage();

    const tokenString = await getData(tokenName);
    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }
    const token: tokenType = JSON.parse(tokenString);
    const response = await axiosHandler({
      url: PROFILE_URL,
      method: 'PUT',
      data: { ...profileInfo, 'profile_picture': profileImageId },
      extra: { 'Content-Type': 'application/json' },
      token: token.access_token,
    })?.catch(e => {
      setSubmitting(false);
      setError(e.message);
    });

    if (response) {

      setSubmitting(false);
      dispatch(updateUserDetails({
        ...user,
        ...response.data
      }));
      dispatch(updateOtherProfileDetails({
        ...profile,
        ...response.data
      }));
    }
  }

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
      setProfilePic(result.uri);  
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
      setProfilePic(result.uri);
    }
  }

  const onSave = async () => {
    await updateProfileInfo();
    navigation.goBack();
  }

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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput value={profileInfo.first_name} onChangeText={(value) => onChange(value, 'first_name')} style={styles.inputText} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput value={profileInfo.last_name} onChangeText={(value) => onChange(value, 'last_name')} style={styles.inputText} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Caption</Text>
          <TextInput value={profileInfo.caption} onChangeText={(value) => onChange(value, 'caption')} style={styles.inputText} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Profile Picture</Text>
          {
            submittingImage ? <ActivityIndicator style={styles.profileImage} size='large' color='green' /> : <Image style={styles.profileImage} source={{ uri: profilePic }} />
          }

          <View style={styles.imagePickerBtnContainer}>
            <Text style={styles.inputLabel}>Change Picture</Text>
            <TouchableOpacity style={styles.pickImageButton} onPress={onPickImage} activeOpacity={0.8}>
              <Ionicons color={'#a6a6a6'} size={30} name='image-outline' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickImageButton} onPress={onOpenCamera} activeOpacity={0.8}>
              <Ionicons color={'#a6a6a6'} size={30} name='camera-outline' />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={onSave} activeOpacity={0.6} style={styles.saveBtn}>
          <Text style={styles.saveText}>{submitting ? <ActivityIndicator color='green' /> : 'Save'}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const mapStateToProps = (state: StoreStateType) => ({
  user: state.user.user,
  profile: state.user.otherProfile,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  inputContainer: {
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 17,
    color: '#a2a2a2',
    marginBottom: 7
  },
  inputText: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5
  },
  imagePickerBtnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    alignItems: 'center'
  },
  pickImageButton: {
    marginRight: 15,
    marginLeft: 15
  },
  profileImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10
  },
  saveBtn: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#454dea'
  },
  saveText: {
    color: '#fff'
  }
});
