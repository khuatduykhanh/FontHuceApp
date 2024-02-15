import { View, Text,StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import avatar from '../../../assets/img/avatar.png'
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const Post = () => {
  return (
    <View style={styles.containerHeader}>
        <Image source={avatar} style={styles.imageUser}></Image>
        <Text style={styles.inputText}>Bạn đang nghĩ gì?</Text>
    </View>
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
    }
})
export default Post