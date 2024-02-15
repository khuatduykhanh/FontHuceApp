import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions, ScrollView, } from 'react-native'
import React,{useState,} from 'react'
import Toast from 'react-native-simple-toast';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {useNavigation} from "@react-navigation/native"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
import {faUser,faEnvelope,faEyeSlash} from "@fortawesome/free-regular-svg-icons"
import lock from "../../assets/img/password.png"
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import DeviceInfo from 'react-native-device-info';
import gif from "../../assets/gif/loading.gif"
import { register } from "../service/auth"
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const Signin = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState(true)
    const [checkPassword1, setCheckPassword1] = useState(true)
    const [isValid, setIsValid] = useState(true);
    const [isValidConfirm, setIsValidConfirm] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [loading, setLoading] = useState(false)
    // const [checkNavi, setCheckNavi] = useState(false)
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
    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@huce\.edu\.vn$/;
      const isValid = emailPattern.test(email);
      setIsValidEmail(isValid);
    };
    const validateName = () =>{
      const checkName = name === '' ? false : true
      setIsValidName(checkName)
    }
    
    const submitRegister = async () => {
      if(isValid && isValidConfirm && isValidName && isValidEmail){
       
        try {
          setLoading(true);
          const data = await register(
            {
              name: name,
              email: email,
              password: password
            }
          );
          if(data.status == 200){
            navigation.navigate('ConfirmEmail',{ email })
          }
        } catch (error){
          Toast.show('Email đã tồn tại');
        }finally {
          setLoading(false);
        }
      }
    }
    // console.log("password",password,confirmPassword);
  return (
    <SafeAreaView style={styles.container}>
        
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Welcome')}>
            <FontAwesomeIcon icon={faAngleLeft} size={30} />
        </TouchableOpacity>
        <KeyboardAvoidingView
        style={{ 
            justifyContent: "center",}} behavior="padding"
            keyboardVerticalOffset={10}
        >
          <ScrollView scrollToEnd={true}>
        <View style={styles.containerRes}>
            <Text style={styles.textRes}>Đăng Ký</Text>
        </View>
        <View style={styles.containerInput}>
            <TextInput
            style={styles.inputEmail}
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
            onBlur={validateName}
            />
            <FontAwesomeIcon icon={faUser} size={20} style={styles.iconEmail}/>
            {!isValidName && (
              <Text style={{ color: 'black' }}>Tên không được để rỗng</Text>
            )}
        </View>
        <View style={styles.containerInput}>
            <TextInput
            style={styles.inputEmail}
            placeholder="Email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={(value) => setEmail(value)}
            autoCapitalize="none"
            onBlur={validateEmail}
            />
            <FontAwesomeIcon icon={faEnvelope} size={20} style={styles.iconEmail}/>
            {!isValidEmail && (
              <Text style={{ color: 'black' }}>Email không hợp lệ </Text>
            )}
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
              <Text style={{ color: 'black' }}>
                Vui lòng nhập lại password
              </Text>
            )}
        </View>
        <View style={[styles.containerInput]}>
            <TextInput
            style={[styles.inputEmail, styles.paddingRight]}
            placeholder="Password"
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
              <Text style={{ color: 'black' }}>
                Vui lòng nhập lại password không trùng
              </Text>
            )}
        </View>
        <TouchableOpacity style={styles.containerSignin} onPress={submitRegister} >
                {loading ? <Image source={gif} style={styles.gifImage} /> : 
                <Text style={styles.textSignin}>Đăng Ký</Text>
                }    
        </TouchableOpacity>
        <View style={styles.containerNew}>
            <Text style={styles.textNew}>Bạn đã có tài khoản?</Text>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textNewRes}>Đăng nhập</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
    marginTop: verticalScale(20),
  },
  containerRes: {
    marginTop: verticalScale(30),
    marginLeft: horizontalScale(30),
    marginBottom: verticalScale(20)
  },
  textRes:{
    fontFamily: 'Inter',
    fontSize: scaleFontSize(45),
    fontWeight: '600',
    lineHeight: scaleFontSize(70),
    letterSpacing: 1,
  },
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20)
  },
  containerPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(5)
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
  iconEmail:{
    position: 'absolute',
    left: isSmall ? 40 : 45,
    top: isSmall ? 13 : 15,
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
  paddingRight:{
    paddingRight: horizontalScale(60),
  },
  containerSignin:{
    width: horizontalScale(360),
    height: 60,
    backgroundColor:'#171F69',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    marginTop: 25
  },
  textSignin:{
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 2,
  },
  forget: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  textForget:{
    fontSize: 16,
    fontWeight: '500',
  },
  containerNew:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 30
  },
  textNew:{
    fontSize: 17,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  textNewRes:{
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  textNewRes:{
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#171F69',
  },
  gifImage:{
    width: horizontalScale(40),
    height: verticalScale(40),
    resizeMode: 'cover',
  }
});
export default Signin