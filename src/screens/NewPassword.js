import { View, Text, SafeAreaView,StyleSheet,TouchableOpacity,TextInput,Image,Dimensions } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-simple-toast';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {faAngleLeft,faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import lock from "../../assets/img/password.png"
import {verifyForgotPassword} from "../service/auth"
import DeviceInfo from 'react-native-device-info';
import {useNavigation,useRoute} from "@react-navigation/native"
import gif from "../../assets/gif/loading.gif"
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const NewPassword = () => {
    const route = useRoute()
    const {myString} = route.params;
    const navigation = useNavigation()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState(true)
    const [checkPassword1, setCheckPassword1] = useState(true)
    const [isValid, setIsValid] = useState(true);
    const [isValidConfirm, setIsValidConfirm] = useState(true);
    const [loading, setLoading] = useState(false)
    const handlePasswordChange = () => {
     
      // Gọi hàm validation ở đây
      validatePassword(password);
    };
    const validatePassword = (password) => {
      // Điều kiện: Ít nhất 8 ký tự
      const isLengthValid = password.length >= 8;
      // Điều kiện: Chứa ít nhất một chữ cái viết hoa
      const hasUppercase = /[A-Z]/.test(password);
      // Điều kiện: Chứa ít nhất một chữ cái viết thường
      const hasLowercase = /[a-z]/.test(password);
      // Điều kiện: Chứa ít nhất một số
      const hasNumber = /\d/.test(password);
    
      // Kiểm tra tất cả các điều kiện và cập nhật state
      const isValidPassword = isLengthValid && hasUppercase && hasLowercase && hasNumber;
      setIsValid(isValidPassword);
    };
    const handleConfirmPasswordChange = (value) => {
      const newPassword = value;
      setConfirmPassword(newPassword)
      validatePasswordConfirmation(password,newPassword);
    }
    const validatePasswordConfirmation = (password, confirmPassword) => {
      const isValidPasswordConfirmation = password === confirmPassword;
      setIsValidConfirm(isValidPasswordConfirmation);
    };
    const handleSubmit = async () =>{
      const req = {
        passwordNew: password
      }
      console.log(password,myString)
      try{
        setLoading(true);
        const data = await verifyForgotPassword(myString,req)
        if(data.status == 200 && data.data !== null){
          Toast.show('Thành công');
          navigation.navigate('Login')
        }
      } catch (error) {
        Toast.show(error);
      }finally {
        setLoading(false);
      }
    }
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('ForgotPassword')}>
            <FontAwesomeIcon icon={faAngleLeft} size={30} />
        </TouchableOpacity>
        <View style={styles.containerTitle}>
        <Text style={styles.title}>
          Đặt lại mật khẩu của bạn
        </Text>
        </View>
        <View style={[styles.containerInput]}>
            <TextInput
            style={[styles.inputEmail, styles.paddingRight]}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={checkPassword}
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(value) => setPassword(value)}
            onBlur={handlePasswordChange}
            />
            <Image source={lock} style={styles.imagePassword}/>
            <TouchableOpacity style={styles.iconEye}  onPress={() => setCheckPassword(!checkPassword)}>
                <FontAwesomeIcon icon={faEyeSlash} size={25} />
            </TouchableOpacity>
            {!isValid && (
              <Text style={{ color: 'black',marginTop: 10 }}>
                Vui lòng nhập lại password
              </Text>
            )}
        </View>
        <View style={[styles.containerInput]}>
            <TextInput
            style={[styles.inputEmail, styles.paddingRight]}
            placeholder="Confirm Password"
            textContentType="password"
            secureTextEntry={checkPassword1}
            autoCorrect={false}
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={(value) => handleConfirmPasswordChange(value)}
            />
            <Image source={lock} style={styles.imagePassword}/>
            <TouchableOpacity style={styles.iconEye}  onPress={() => setCheckPassword1(!checkPassword1)}>
                <FontAwesomeIcon icon={faEyeSlash} size={25} />
            </TouchableOpacity>
            {!isValidConfirm && (
              <Text style={{ color: 'black', marginTop: '10' }}>
                Vui lòng nhập lại password không trùng
              </Text>
            )}
        </View>
        <TouchableOpacity style={styles.containerSignin} onPress={handleSubmit} >
                  {loading ? <Image source={gif} style={styles.gifImage} /> : 
                  <Text style={styles.textSignin}>Xác thực</Text>
                  }  
        </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
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
    marginTop: verticalScale(25),
  },
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30)
  },
  inputEmail:{
    width: horizontalScale(380),
    height: 50,
    borderColor: '#171F69',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: horizontalScale(60),
    paddingRight: horizontalScale(20),
    fontSize: scaleFontSize(20),
    fontFamily: 'Inter',
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  paddingRight:{
    paddingRight: horizontalScale(60),
  },
  imagePassword:{
    width: 25, 
    height: 25,
    resizeMode: 'cover',
    position: 'absolute',
    left:  isSmall ? 40 : 45,
    top: isSmall ? 10 : 10,
  },
  iconEye:{
    color:'#171F69',
    position: 'absolute',
    right: isSmall ? 40 : 45,
    top: isSmall ? 13 : 15,
  },
  title:{
    fontSize: scaleFontSize(35),
    fontWeight: '700',
    fontFamily: 'Inter',
    color: 'black',
  },
  containerTitle:{
    width: horizontalScale(300),
    marginLeft: horizontalScale(30),
    marginTop: verticalScale(100),
    marginBottom: verticalScale(10)
  },
  containerSignin:{
    width: horizontalScale(360),
    height: 60,
    backgroundColor:'#171F69',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    marginTop: verticalScale(45)
  },
  gifImage:{
    width: horizontalScale(40),
    height: verticalScale(40),
    resizeMode: 'cover',
  },
  textSignin:{
    color: 'white',
    fontFamily: 'Inter',
    fontSize: scaleFontSize(23),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 2,
},
});
export default NewPassword