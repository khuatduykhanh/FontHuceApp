import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native"
import logo from "../../assets/img/logo.png"
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
const Intro = () => {
    const navigation = useNavigation();
    const {width, height} = Dimensions.get('window');
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <View style={styles.containerTitle}>
          <Text style={styles.nameTitle}>Welcome to</Text>
          <Text style={styles.nameTitle}>HuceApp</Text>
          <Text style={styles.description}>Ứng dụng kết nối mọi sinh viên với nhau </Text>
          <TouchableOpacity
          onPress={() => navigation.navigate('Welcome')}
          style={styles.start}
          >
        <Text style={styles.nameStart}>Bắt đầu</Text>
      </TouchableOpacity>
      </View>
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
    height: verticalScale(260),
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
  description: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(20),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: verticalScale(30),
  },
  start:{
    width: horizontalScale(370),
    height: verticalScale(80),
    backgroundColor:'#171F69',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(80)
  },
  nameStart:{
    color: 'white',
    fontFamily: 'Inter',
    fontSize: scaleFontSize(23),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 2,
  }

});
export default Intro