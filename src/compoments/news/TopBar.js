import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import messager from "../../../assets/img/messager.png"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const TopBar = () => {
  return (
    <View style={styles.containerHeader}>
        <Text style={styles.name}>Huce News</Text>
        <View style={styles.containerHeaderRight} >
            <TouchableOpacity style={styles.buttonRight}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={isSmall ? 20 : 22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight}>
                <Image source={messager} style={styles.imageMessager}></Image>
            </TouchableOpacity>
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
    containerHeader:{
        width: '100%',
        height: 60,
        justifyContent: "space-between",
        alignItems:"center",
        flexDirection: "row"
    },
    containerHeaderRight:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-around",
        width: horizontalScale(120),
    },
    buttonRight:{
        backgroundColor: '#DDDDDD',
        width: isSmall ? 36 :40,
        height: isSmall ? 36 :40,
        borderRadius: isSmall ? 18 : 20,
        alignItems:"center",
        justifyContent: 'center'
    },
    imageMessager:{
        width: isSmall ? 30 : 35,
        height: isSmall ? 30 : 35,
    },
    name:{
        marginLeft: horizontalScale(15),
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: scaleFontSize(30),
        color: '#171F69'
    }
})
export default TopBar