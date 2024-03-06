import React from 'react';
import { View, Image, Button, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import {useNavigation,useRoute} from "@react-navigation/native"
import Toast from 'react-native-simple-toast';
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import { useDispatch, useSelector } from 'react-redux';
import {uploadAvatar} from "../service/account"
const createFormData = (photo) => {
  const data = new FormData();
  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  data.append('type',"avatar")
  console.log("test form data",data)

  return data;
};

const Avatar = () => {
  const [photo, setPhoto] = React.useState(null);
  const user = useSelector(state => state.user);
  const navigation = useNavigation()
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
  
  const handleUploadPhoto = async () => {
    console.log("form"+ createFormData(photo))
    console.log("photo",photo)
    if (photo) {
      const data = await uploadAvatar(createFormData(photo),user.accessToken);
      console.log("data",data)
      if(data.status == 200 && data.data.status == 1){
        Toast.show('Thiết lập thành công');
      }else{
        Toast.show('uploadfile thất bại');
      }
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
