import React from 'react';
import { View, Image, Button, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
const SERVER_URL = 'http://192.168.1.6:8080';

const createFormData = (photo) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  data.append('type',"avatar")

  return data;
};

const Avatar = () => {
  const [photo, setPhoto] = React.useState(null);
  const user = useSelector(state => state.user);
  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: false }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };
  
  const handleUploadPhoto = () => {
    console.log("form"+ createFormData(photo))
    console.log("photo",photo)
    if (photo) {
        RNFetchBlob.fetch(`${SERVER_URL}/api/account/uploadImage`, {
        method: 'POST',
        body: createFormData(photo),
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.accessToken}`,
          },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      console.log('No photo selected');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.conatinerTitle}>
            <Text style={styles.title}>Thiết lập ảnh đại diện</Text>
        </View>
      { photo ? 
        <View style={styles.containerImage}>
          <Image
            source={{ uri: photo.uri }}
            style={styles.imgaeNone}
          />
          <TouchableOpacity style={styles.chooseButton} onPress={handleChoosePhoto} >
                <Text style={styles.chooseTitle}>Thay đổi ảnh</Text>
            </TouchableOpacity>
        </View>
     :  
        <View style={styles.containerImage}>
        <View style={styles.imgaeNone}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleChoosePhoto} >
                <Text style={styles.add}>+</Text>
            </TouchableOpacity>
        </View>
        </View>
    }   
        <TouchableOpacity style={styles.buttonUpload} onPress={handleUploadPhoto} >
                <Text style={styles.upload}>Tải ảnh lên</Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    conatinerTitle:{
        alignItems: "center",
        marginTop: verticalScale(90),
        width:'auto', 
        marginBottom: verticalScale(50)
    },
    title: {
        fontSize: scaleFontSize(30),
        fontFamily: 'Inter',
        fontWeight: '600',
    },
    imgaeNone:{
        width: horizontalScale(200),
        height: verticalScale(200),
        backgroundColor: "#DDDDDD",
        borderRadius: 100,
        alignSelf:'center',
    },
    buttonAdd:{
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    add:{
        fontSize: scaleFontSize(50),
        fontFamily: 'Inter',
        fontWeight: '500',
        color: "#171F69"
    },
    containerImage:{
        marginBottom: verticalScale(50)
    },
    chooseButton:{
        marginTop: verticalScale(30),
        alignSelf:"center",
        // backgroundColor: '#171F69',
    },
    chooseTitle:{
        fontSize: scaleFontSize(20),
        fontFamily: 'Inter',
        fontWeight: '500',
    },
    buttonUpload:{
        alignSelf:"center", 
        backgroundColor: '#171F69',
        width: horizontalScale(200),
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: horizontalScale(10)
    },
    upload:{
        fontSize: scaleFontSize(20),
        fontFamily: 'Inter',
        fontWeight: '500',
        color: 'white'
    }
    
})
export default Avatar;
