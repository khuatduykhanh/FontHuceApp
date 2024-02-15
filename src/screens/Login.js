import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions} from 'react-native'
import React,{useState,} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {useNavigation} from "@react-navigation/native"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
import {faEnvelope, faEyeSlash} from "@fortawesome/free-regular-svg-icons"
import lock from "../../assets/img/password.png"
import gif from "../../assets/gif/loading.gif"
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import {updateUser} from "../redux/reducers/User"
import {login} from '../service/auth'
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const handleSubmit = async() => {
      try{
        setLoading(true)
        const res = await login({
          email: email,
          password: password
        })
        if(res.status == 200 && res.data.status == 1){
          console.log(res.data.data)
          dispatch(updateUser(res.data.data));
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
  return (
    <SafeAreaView style={styles.container}>
        
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Welcome')}>
            <FontAwesomeIcon icon={faAngleLeft} size={30} />
        </TouchableOpacity>
        <KeyboardAvoidingView
        style={{ 
            justifyContent: "center",}} behavior="padding"
            keyboardVerticalOffset={isSmall ? 75 : 20 }
        >
        <View style={styles.containerRes}>
            <Text style={styles.textRes}>Đăng Nhập</Text>
        </View>
        <View style={styles.containerInput}>
            <TextInput
            style={styles.inputEmail}
            placeholder="Email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={(value) => setEmail(value)}
            autoCapitalize="none"
            />
            <FontAwesomeIcon icon={faEnvelope} size={isSmall ? 25 :30} style={styles.iconEmail}/>
        </View>
        <View style={[styles.containerPassword]}>
            <TextInput
            style={[styles.inputEmail, styles.paddingRight]}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={checkPassword}
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(value) => setPassword(value)}
            />
            <Image source={lock} style={styles.imagePassword}/>
            <TouchableOpacity style={styles.iconEye}  onPress={() => setCheckPassword(!checkPassword)}>
                <FontAwesomeIcon icon={faEyeSlash} size={isSmall ? 25 :30} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forget}  onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.textForget}>Quên mật khẩu ?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerSignin}  onPress={handleSubmit}>
              {loading ? <Image source={gif} style={styles.gifImage} /> : 
                <Text style={styles.textSignin}>Đăng Nhập</Text>}
        </TouchableOpacity>
        <View style={styles.containerNew}>
            <Text style={styles.textNew}>Tạo tài khoản mới ?</Text>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Signin')}>
                <Text style={styles.textNewRes}>Đăng ký</Text>
        </TouchableOpacity>
        </View>
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
    marginTop: 20,
  },
  containerRes: {
    marginTop: verticalScale(100),
    marginLeft: horizontalScale(30)
  },
  textRes:{
    fontFamily: 'Inter',
    fontSize: scaleFontSize(45),
    fontWeight: '600',
    lineHeight: 70,
    letterSpacing: 1,
  },
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30)
  },
  containerPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10)
  },
  inputEmail:{
    width: horizontalScale(380),
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
  paddingRight:{
    paddingRight: horizontalScale(60)
  },
  iconEmail:{
    position: 'absolute',
    left: isSmall ? 40 :45,
    top: isSmall ? 17 :15,
  },
  imagePassword:{
    width: horizontalScale(35), 
    height: horizontalScale(35),
    resizeMode: 'cover',
    position: 'absolute',
    left: isSmall ? 40 :45,
    top: isSmall ? 12 :10,
  },
  iconEye:{
    color:'#171F69',
    position: 'absolute',
    right: isSmall ? 40 :45,
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
    marginTop: verticalScale(20)
  },
  textSignin:{
    color: 'white',
    fontFamily: 'Inter',
    fontSize: scaleFontSize(23),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 2,
  },
  forget: {
    marginRight: 30,
    width: 130,
    alignSelf:"flex-end",
  },
  textForget:{
    fontSize: 16,
    fontWeight: '500',
  },
  containerNew:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30)
  },
  textNew:{
    fontSize: scaleFontSize(17),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  textNewRes:{
    fontSize: scaleFontSize(20),
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#171F69',
  },
  gifImage:{
    width: horizontalScale(40),
    height: verticalScale(40),
    resizeMode: 'cover',
  },
});
export default Login