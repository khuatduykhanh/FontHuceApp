import { View, Text,StyleSheet,Dimensions, SafeAreaView, TouchableOpacity,Image, ScrollView } from 'react-native'
import React from 'react'
import {useNavigation,useRoute} from "@react-navigation/native"
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
import {faAngleLeft, faEarthAsia,faThumbsUp, faShare} from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as regularThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const DetailPost = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const {avatar,props} = route.params;
  return (
    <SafeAreaView>
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesomeIcon icon={faAngleLeft} size={25} />
            </TouchableOpacity>
            <Image source={avatar} style={styles.avatar} ></Image>
            <View style={styles.containerName}>
                <Text style={styles.name}>Khuất Duy Khánh</Text>
                <View style={styles.containerTime}>
                <Text style={styles.time}>1 Ngày trước </Text>
                <FontAwesomeIcon icon={faEarthAsia} style={{color: "#474748",}} size={10}  />
                </View>
            </View>
        </View>
        <ScrollView>
            <View style={styles.containerCap}>
                <Text style={styles.cap}>{props.cap}</Text>
            </View>
            <Image source={avatar} style={styles.image} ></Image>
            <View style={styles.containerFooter}>
            <View style={styles.containerFooterBottom}>
                <View style={styles.containerFooterBottomLeft}>
                    <TouchableOpacity style={styles.containerButtonLike}>
                        <FontAwesomeIcon icon={regularThumbsUp} style={{ color: 'grey', marginRight: 5 }} size={25} /> 
                        <Text>Thích</Text> 
                    </TouchableOpacity>
                </View>
                <View style={styles.containerFooterBottomMid}>
                    <TouchableOpacity style={styles.containerButtonLike}>
                        <FontAwesomeIcon icon={faComment} style={{ color: 'grey', marginRight: 5 }} size={25} /> 
                        <Text>Bình luận</Text> 
                    </TouchableOpacity>
                </View>
                <View style={styles.containerFooterBottomRight}>
                    <TouchableOpacity style={styles.containerButtonLike}>
                        <FontAwesomeIcon icon={faShare} style={{ color: 'grey', marginRight: 5 }} size={25} /> 
                        <Text>Chia sẻ</Text> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerFooterTop}>
                <View style={styles.containerFooterTopLeft}>
                    <View style={styles.containerLike}>
                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'white' }} size={12} />
                    </View>
                    <Text>123</Text>
                </View>
                {/* <View style={styles.containerFooterTopRight}> */}
                    <Text style={{ marginRight: 15 }}>6 bình luận</Text>
                    <Text>2 lượt chia sẻ</Text>
                {/* </View> */}
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    containerHeader:{
        width: '100%',
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        // backgroundColor: 'red'
    },
    avatar:{
        width: isSmall ? 40 : 46,
        height: isSmall ? 40 : 46,
        borderRadius: isSmall ? 20 : 23,
        marginLeft: horizontalScale(15)
    },
    containerName:{
        marginLeft: 10
    },
    name:{
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: scaleFontSize(16),
        marginBottom: 3
    },
    containerTime:{
        flexDirection: 'row'
    },
    time:{
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: scaleFontSize(12),
        marginBottom: 3,
        marginRight: 6,
        color: '#474748'
    },
    containerCap:{
       
        width: 'auto',
        height: 'auto',
    },
    cap: {
        marginLeft: horizontalScale(15),
        marginRight:  horizontalScale(10),
        marginBottom:  10,
        marginTop: 5,
        fontFamily: 'Inter',
        fontSize: scaleFontSize(15),
        fontWeight: '400',
        overflow:"hidden",
        lineHeight: 20
    },
    image:{
        width: '100%',
        height: 400
    },
    containerFooter:{
        margin: 5,
    },
    containerFooterTop:{
        justifyContent: 'space-between',
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row'
    },
    containerFooterTopRight:{
        flexDirection: 'row'
    },
    containerFooterTopLeft:{
        flexDirection: 'row'
    },
    containerLike:{
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#128BFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    containerFooterBottom:{
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12,
        paddingTop: 8,
        paddingLeft: 15,
        paddingRight: 15,
    },
    containerFooterBottomLeft:{
        flexDirection: 'row'
    },
    containerFooterBottomMid:{
        flexDirection: 'row'
    },
    containerFooterBottomRight:{
        flexDirection: 'row'
    },
    containerButtonLike:{
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default DetailPost