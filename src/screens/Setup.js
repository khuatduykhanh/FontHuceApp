import { View, Text, StyleSheet,SafeAreaView, TouchableOpacity, TextInput,Dimensions, Image } from 'react-native'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
import React, {useState} from 'react'
import {useNavigation} from "@react-navigation/native"
import DropdownComponent from "../compoments/Dropdown"
import {faEnvelope} from "@fortawesome/free-regular-svg-icons"
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import gif from "../../assets/gif/loading.gif"
import { forgotPassword } from "../service/auth"
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const Setup = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmitEmail = async () =>{
      try {
        setLoading(true)
        const data = await forgotPassword(email)
        if(data !== null) {
          navigation.navigate('ConfirmForgotPassword', {email})
        }
      } catch(error) {
        Toast.show('Email không tồn tại');
      } finally {
        setLoading(false);
      }
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerContent}>
            <Text style={styles.title}>
                Nhập thông tin lớp học
            </Text>
            <View style={styles.containerInput}>
            <DropdownComponent title="Khoa"/>
            <DropdownComponent title="Lớp"/>
            </View>
            <TouchableOpacity style={styles.containerSignin}  onPress={() => navigation.navigate("Avatar")}>
                  {loading ? <Image source={gif} style={styles.gifImage} /> : 
                  <Text style={styles.textSignin}>Tiếp theo</Text>
                  }  
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    back:{
      width: horizontalScale(50),
      height: horizontalScale(50),
      backgroundColor: '#DDDDDD',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: horizontalScale(30),
      borderRadius: 15,
      boxShadow: '0px 8px 24px 0px #00000014',
      marginTop: verticalScale(20),
    },
    containerContent:{
      width: horizontalScale(350),
      height: horizontalScale(300),
      marginLeft: horizontalScale(30),
      marginTop: verticalScale(100),

    },
    title:{
        fontSize: scaleFontSize(35),
        fontWeight: '700',
        fontFamily: 'Inter',
        color: 'black',
    },
    containerInput: {
        justifyContent: 'center',
        marginTop: verticalScale(60),

    },
    inputEmail:{
        width: horizontalScale(360),
        height: 60 ,
        borderColor: '#171F69',
        borderWidth: 1,
        marginBottom: verticalScale(20),
        borderRadius: 10,
        paddingLeft: horizontalScale(60),
        paddingRight: horizontalScale(20),
        fontSize: scaleFontSize(20),
        fontFamily: 'Inter',
        fontWeight: '500',
        textTransform: 'lowercase',
    },
    iconEmail:{
        position: 'absolute',
        left: isSmall ? 13 :15,
        top: isSmall ? 17 :15,
    },
    containerSignin:{
        width: horizontalScale(360),
        height: 60,
        backgroundColor:'#171F69',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        marginTop: verticalScale(10)
    },
    textSignin:{
        color: 'white',
        fontFamily: 'Inter',
        fontSize: scaleFontSize(23),
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 2,
    },
    gifImage:{
      width: horizontalScale(40),
      height: verticalScale(40),
      resizeMode: 'cover',
    }
  });
export default Setup