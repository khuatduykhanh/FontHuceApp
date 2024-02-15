import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native"
import logo from "../../assets/img/logo.png"
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
const Welcome = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <View style={styles.containerTitle}>
          <Text style={styles.nameTitle}>Welcome to</Text>
          <Text style={styles.nameTitle}>HuceApp</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.start}
      >
        <Text style={styles.nameStart}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signin')}
        style={styles.start}
      >
        <Text style={styles.nameStart}>Đăng ký</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  logo: {
    width: horizontalScale(250), // Chiều rộng mong muốn
    height: verticalScale(200), // Chiều cao mong muốn
    resizeMode: 'cover',
    marginTop: verticalScale(100),
  },
  containerTitle: {
    width: horizontalScale(300),
    height: verticalScale(200),
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  nameTitle:{
    fontFamily: 'Inter',
    fontSize: scaleFontSize(45),
    fontWeight: '600',
    lineHeight: scaleFontSize(60),
    letterSpacing: 1,
  },
  start:{
    width: horizontalScale(350),
    height: verticalScale(80),
    backgroundColor:'#171F69',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(30),
  },
  nameStart:{
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 2,
  }

});
export default Welcome