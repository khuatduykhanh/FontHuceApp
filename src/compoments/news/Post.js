import { View, Text,StyleSheet, Dimensions, Image, Modal , TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import React,{ useEffect,useState, useRef } from 'react'
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { faXmark, faUserTag, faLocationDot, faCamera } from "@fortawesome/free-solid-svg-icons";
import { faImage, faFaceSmile, faKeyboard } from "@fortawesome/free-regular-svg-icons"
import {post} from "../../service/Post"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const createFormData = (photo,cap) => {
  const data = new FormData();
  console.log("photo",photo)
  photo.forEach(element => {
    data.append('files', {
      name: element.fileName,
      type: element.type,
      uri: Platform.OS === 'ios' ? element.uri.replace('file://', '') : element.uri,
    });
  });
 
  data.append('cap',cap)

  return data;
};

const Post = () => {
    const user = useSelector(state => state.user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [postText, setPostText] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImageCamera, setSelectedImageCamera] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    console.log("form data ", createFormData(selectedImages,postText))
    const handleUploadPhoto = async () => {
      if (selectedImages) {
        const data = await post(createFormData(selectedImages,postText),user.accessToken);
        if(data.status == 200 && data.data.status == 1){
          Toast.show('Thiết lập thành công');
        }else{
          Toast.show('uploadfile thất bại');
        }
      } else {
        console.log('No photo selected');
      }
    };
    const pickImages = () => {
        const options = {
          mediaType: 'mixed', // Chỉ chọn ảnh
          maxHeight: 380,
          maxWidth: '100%',
          selectionLimit: 0
        };
    
        ImagePicker.launchImageLibrary(options, (response) => {
          if (!response.didCancel) {
            setSelectedImages(response.assets.map((image) => ({ uri: image.uri })));
          }
        });
      };
    // console.log("image",selectedImages)
    const handleCameraLaunch = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 380,
          maxWidth: '100%',
        };
      
        ImagePicker.launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImageCamera(imageUri);
            console.log(imageUri);
          }
        });
      }
  return (
    <>
    <View style={styles.containerHeader}>
        <Image source={{ uri: `http://localhost:8080/api/account/getImage/${user.studentCode}` }} style={styles.imageUser}></Image>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.inputText}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
    </View>
    <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
        style={{ flex: 1,
            justifyContent: "center",
            backgroundColor: "#f5f5f5",}} behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? -20 : -180}
        >
        <SafeAreaView style={styles.modalContainer}>
            <View>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesomeIcon icon={faXmark} size={20}/>
            </TouchableOpacity>
            <Text style={styles.titleModal}>Tạo bài viết</Text>
            <TouchableOpacity onPress={isDisabled ? undefined : handleUploadPhoto} disabled={isDisabled} >
              <Text style={postText != '' || selectedImages.length != 0 ? styles.enable : styles.titleModal}>Đăng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentModal}>

            <View style={styles.contentModalHeader}>
            <Image source={{ uri: `http://localhost:8080/api/account/getImage/${user.studentCode}` }} style={styles.avatarPost}></Image>
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.name}>{user.name}</Text>
                <Text>Công khai</Text>
            </View>
            </View>
            <View >
            <ScrollView >
            <View style={styles.containerCap}>
                <TextInput
                style={styles.inputCap}
                multiline={true}
                placeholder="Bạn đang nghĩ gì?"
                placeholderTextColor="grey"
                value={postText}
                onChangeText={(value) => setPostText(value)}
                />
            </View>
            <View style={styles.containerImage}>
                { selectedImages.length == 1 && 
                    <Image source={selectedImages[0]}  style={{ width: '100%', height: 380,resizeMode: "cover", }}></Image>
                }
                { selectedImages.length == 2 && selectedImages.map((image, index) => (
                    <Image key={index} source={image}  style={styles.image2}></Image>
                ))}
                { selectedImages.length == 3 && <>
                      <Image  source={selectedImages[0]}  style={{ width: '49.9%',height: 380,resizeMode: 'cover' }}></Image>
                      <View style={{ width:'100%', height:380, flexDirection: 'column', marginLeft: 1, resizeMode: 'cover'}}>
                      <Image  source={selectedImages[1]}  style={{ width: '49.9%',height:190,resizeMode: 'cover' }}></Image>
                      <Image  source={selectedImages[2]}  style={{ width: '49.9%',height:190,flex:1, resizeMode: 'cover'}}></Image>
                      </View>
                </>   
                }
                { selectedImages.length >= 4 && <>
                      <Image  source={selectedImages[0]}  style={{ width: '49.9%',height: 380, resizeMode: 'cover'}}></Image>
                      <View style={{ width:'100%', height:417, flexDirection: 'column', marginLeft: 1,position:'relative'}}>
                      <Image  source={selectedImages[1]}  style={{ width: '49.9%',height:190,resizeMode: 'cover' }}></Image>
                      <Image  source={selectedImages[2]}  style={{ width: '49.9%',height:190,flex:1, opacity: 0.5, resizeMode: 'cover' }}></Image>
                      <Text style={{position:'relative', bottom: 100,right:-80,fontFamily: 'Inter',fontWeight: '400',fontSize: 30}}>+{selectedImages.length -3}</Text>
                      </View>
                </>   
                }
            
            </View>
            </ScrollView>
            </View>
          </View>
          </View>
          
        </SafeAreaView>
        <View>
            <View style={styles.containerFooter}>
                <TouchableOpacity onPress={pickImages}>
                <FontAwesomeIcon icon={faImage} size={25} style={{ color: '#3BB450' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                <FontAwesomeIcon icon={faUserTag} size={25} style={{ color: '#165EEF' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                <FontAwesomeIcon icon={faFaceSmile} size={25} style={{ color: '#F4AC20' }}/>
                </TouchableOpacity>
                <TouchableOpacity>
                <FontAwesomeIcon icon={faLocationDot} size={25} style={{ color: '#F03A2F' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                <FontAwesomeIcon icon={faKeyboard} size={25} style={{ color: '#28B096' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCameraLaunch}>
                <FontAwesomeIcon icon={faCamera} size={25} style={{ color: '#1292F1' }} />
                </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
}
const styles = StyleSheet.create({
    containerHeader:{
        width: '100%',
        height: isSmall ? 40 : 50,
        flexDirection: 'row',
        alignItems:'center'
    },
    imageUser:{
        width: isSmall ? 36 : 40,
        height: isSmall ? 36 : 40,
        marginLeft: horizontalScale(15),
        borderRadius: isSmall ? 18 : 20
    },
    inputText:{
        marginLeft: horizontalScale(15),
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: scaleFontSize(15),
        color: 'black'
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headerModal:{
        height: 50,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: isSmall ? 16 : 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    titleModal:{
        fontFamily: 'Inter',
        fontSize: scaleFontSize(16),
        fontWeight: '600',
    },
    contentModal:{
    },
    contentModalHeader:{
        height: isSmall ? 60 : 68,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    avatarPost:{
        width: isSmall ? 40 : 46,
        height: isSmall ? 40 : 46,
        marginLeft: horizontalScale(15),
        borderRadius: isSmall ? 20 : 23
    },
    name: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: scaleFontSize(16),
        marginBottom: 3
    },
    inputCap:{
        fontSize: scaleFontSize(20),
        fontFamily: 'Inter',
        fontWeight: '400',
        height: 'auto'
    },
    containerCap:{
        marginHorizontal: horizontalScale(10),
        marginTop: isSmall ? 15 : 15,
        height: 'auto',
    },
    enable:{
        fontFamily: 'Inter',
        fontSize: scaleFontSize(16),
        fontWeight: '600',
        color: '#128BFC'
    },
    containerFooter:{
        height: 80,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20
    },
    containerImage:{
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 400,
        justifyContent:'space-between',
        height: 380
    },
    image2:{
        resizeMode: "cover",
        width: '49.9%',
        height: 360,

    }
})
export default Post