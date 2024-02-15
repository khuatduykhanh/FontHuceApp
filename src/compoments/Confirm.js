import { View, Text,StyleSheet,TouchableOpacity,SafeAreaView, TextInput, KeyboardAvoidingView, Dimensions} from 'react-native'
import React,{ useState, useRef} from 'react'
import Toast from 'react-native-simple-toast';
import {useNavigation,useRoute} from "@react-navigation/native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const Confirm = ({verifyEmail, sendVerifyEmail, buttonBack, buttonConfirm, email, check}) => {
    const navigation = useNavigation()
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
    const handleVerificationCodeChange = (text, index) => {
        // Hạn chế độ dài của mã xác nhận là 1 số
        if (/^\d{0,1}$/.test(text)) {
          setVerificationCode((prevCodes) => {
            const newCodes = [...prevCodes];
            newCodes[index] = text;
            return newCodes;
          });
    
          // Chuyển focus sang ô input kế tiếp khi người dùng nhập
          if (text !== '' && index < 3) {
            inputRefs.current[index + 1].focus();
          }
        }
      };
      const handleBackspacePress = (index) => {
        // Xoá số và chuyển focus về ô input trước đó
        setVerificationCode((prevCodes) => {
          const newCodes = [...prevCodes];
          newCodes[index] = '';
          return newCodes;
        });
    
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      };
      const handleKeyPress = (event, index) => {
        // Xử lý khi người dùng bấm phím xoá
        if (event.nativeEvent.key === 'Backspace' && index > 0) {
          handleBackspacePress(index);
        }
      };
      const submitVerifyEmail = async () =>{
        const myString = verificationCode.join('');
        try{
          const data = await verifyEmail(myString);
          if(check == true ){
            if(data.data == true && data.status == 200){
                Toast.show('Xác thực thành công');
                navigation.navigate(`${buttonConfirm}`,{ myString })
              }
          } else {
            if(data.status == 200){
                Toast.show('Đăng ký thành công');
                navigation.navigate(`${buttonConfirm}`)
            }
          }
        } catch (error){
          Toast.show('Mã OTP không đúng');
        }
      }
      const submitSendVerifyEmail = async () =>{
        try{
          const data = await sendVerifyEmail(email);
         
        } catch (error){
          Toast.show('Gửi lại mã không thành công');
        }
      }
  return (
    <SafeAreaView style={styles.container}>
        
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate(`${buttonBack}`)}>
            <FontAwesomeIcon icon={faAngleLeft} size={30} />       
        </TouchableOpacity>
        <KeyboardAvoidingView
        style={{ 
            justifyContent: "center",}} behavior="padding"
            keyboardVerticalOffset={100}
        >
        <View style={styles.containerBody}>
            <Text style={styles.verify}>Xác nhận Email</Text>
            <Text style={styles.description}>Chúng tôi đã gửi mã xác nhận đến email của bạn</Text>
            <Text style={styles.textEmail}>{email}</Text>
            <View style={styles.containerInput}>
                {verificationCode.map((code, index) => (
                    <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={code}
                    onChangeText={(text) => handleVerificationCodeChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    />
                ))}
            </View>
            <TouchableOpacity
                style={styles.containerVerify}
                onPress={submitVerifyEmail}
            >
                <Text style={styles.nameVerify}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.containerAgain}
                onPress={submitSendVerifyEmail}
            >
                <Text style={styles.nameAgain}>Gửi lại</Text>
            </TouchableOpacity>    
        </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#D6D7DA',
    },
    back:{
      width: horizontalScale(50),
      height: horizontalScale(50),
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: horizontalScale(30),
      borderRadius: 15,
      boxShadow: '0px 8px 24px 0px #00000014',
      marginTop: verticalScale(20),
    },
    containerBody:{
        width: horizontalScale(380),
        height: isSmall ? 420 : 480,
        backgroundColor: 'white',
        marginTop: verticalScale(100),
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
    },
    verify:{
        marginTop: verticalScale(50),
        fontFamily: 'Inter',
        fontSize: scaleFontSize(30),
        fontWeight: '600',
        letterSpacing: 0.01,
    },
    description:{
        fontFamily: 'Inter',
        fontSize: scaleFontSize(15),
        fontWeight: '500',
        letterSpacing: 0.01,
        textAlign: 'center',
        marginTop: verticalScale(15),
        color: 'gray'
    },
    textEmail:{
        fontFamily: 'Inter',
        fontSize: scaleFontSize(15),
        fontWeight: '700',
        letterSpacing: 0.01,
        textAlign: 'center',
        marginTop: verticalScale(30),
        color: 'gray'
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(40),
        width: horizontalScale(320),
      },
      input: {
        borderWidth: 2,
        borderColor: '#171F69',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        width: horizontalScale(60),
        textAlign: 'center',
        height: isSmall ? 60 : 70,
        fontSize: scaleFontSize(25),
        fontWeight: '700',
        fontFamily: 'Inter',
        color: '#171F69'
      },
      containerVerify:{
        width: horizontalScale(300),
        height: 60,
        backgroundColor:'#171F69',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      },
      containerAgain:{
        width: horizontalScale(300),
        height: 60,
        backgroundColor:'#DCDCDC',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      nameVerify:{
        color: 'white',
        fontFamily: 'Inter',
        fontSize: scaleFontSize(23),
        fontWeight: '500',
        textAlign: 'center',
      },
      nameAgain:{
        color: 'gray',
        fontFamily: 'Inter',
        fontSize: scaleFontSize(23),
        fontWeight: '500',
        textAlign: 'center',
      },
  });
export default Confirm