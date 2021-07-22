import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


// Dummy Data
import meProfile from '../data/meProfile';


export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [profilePic, setProfilePic] = useState('');
  const [profileInfo, setProfileInfo] = useState({
    first_name: meProfile.first_name,
    last_name: meProfile.last_name,
    caption: meProfile.caption,
    profile_picture: meProfile.profile_picture?.id
  });

  const onChange = (value: string, field: string) => {
    setProfileInfo({ ...profileInfo, [field]: value })
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
      // upload image to the server then get the id of the image and put it in the profileIfo object
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
      // upload image to the server then get the id of the image and put it in the profileIfo object
    }
  }

  return (
    <View style={styles.container}>
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
        <Image style={styles.profileImage} source={{ uri: profilePic }} />
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
    </View>
  );
}

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
  }
});
