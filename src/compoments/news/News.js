import { View, Text,StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
import avatar from '../../../assets/img/avatar.png'
import CollapsibleText from "./CollapsibleText"
import PostImages from "./PostImages"
import {useNavigation} from "@react-navigation/native"
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
import { faEarthAsia, faThumbsUp, faShare } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const News = props => {
    const navigation = useNavigation();
  return (
    <View>
      <View style={styles.liner}></View>
      <View >
        <View style={styles.containerHeader}>
            <Image source={avatar} style={styles.avatar} ></Image>
            <View style={styles.containerName}>
                <Text style={styles.name}>Khuất Duy Khánh</Text>
                <View style={styles.containerTime}>
                <Text style={styles.time}>1 Ngày trước </Text>
                <FontAwesomeIcon icon={faEarthAsia} style={{color: "#474748",}} size={10}  />
                </View>
            </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("DetailPost",{ avatar,props })} >
        <View style={styles.containerCap}>
             {/* <Text numberOfLines={3} style={styles.cap}>Info Launching org reactjs native example HuceApp mons nhon moix ngay voi hajt name cowf no Đây là một thuộc tính CSS không tiêu chuẩn, thường được sử dụng để giới hạn số dòng hiển thị của một phần tử. Trong trường hợp này, nó được sử dụng để giới hạn văn bản chỉ hiển thị tối đa 3 dòng.</Text> */}
            <CollapsibleText text={props.cap} maxLength={150} />
        </View>
        </TouchableOpacity>
        {props.image && (<Image source={avatar} style={styles.imageCap}></Image>)}
        {/* <PostImages images={postImages} /> */}
        
        <View style={styles.containerFooter}>
            <TouchableOpacity onPress={() => navigation.navigate("DetailPost",{ avatar,props })} >
            <View style={styles.containerFooterTop}>
                <View style={styles.containerFooterTopLeft}>
                    <View style={styles.containerLike}>
                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'white' }} size={12} />
                    </View>
                    <Text>123</Text>
                </View>
                <View style={styles.containerFooterTopRight}>
                    <Text style={{ marginRight: 15 }}>6 bình luận</Text>
                    <Text>2 lượt chia sẻ</Text>
                </View>
            </View>
            </TouchableOpacity>
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
        </View>
      </View>
    </View>
  )
}
News.propTypes = {
    // The first name of the user as a required string
    image: PropTypes.bool.isRequired,
    cap: PropTypes.string.isRequired,

  };
const styles = StyleSheet.create({
    liner:{
        width: '100%',
        height: 5,
        backgroundColor: '#DDDDDD'
    },
    containerHeader:{
       width: '100%',
       height: isSmall ? 60 : 70,
       flexDirection: "row",
       alignItems: 'center',
       justifyContent: 'flex-start'
    },
    avatar:{
        width: isSmall ? 46 : 54,
        height: isSmall ? 46 : 54,
        borderRadius: isSmall ? 23 : 27,
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
    time:{
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: scaleFontSize(12),
        marginBottom: 3,
        marginRight: 6,
        color: '#474748'
    },
    containerTime:{
        flexDirection: 'row'
    },
    containerCap:{
        width: '100%',
        height: "auto",
    },
    cap:{
        marginLeft: horizontalScale(15),
        marginRight:  horizontalScale(30),
        marginBottom:  10,
        marginTop: 3,
        fontFamily: 'Inter',
        fontSize: scaleFontSize(15),
        fontWeight: '400',
        overflow:"hidden",
    },
    imageCap:{
        width: '100%',
    },
    containerFooter:{
        margin: 5,
    },
    containerFooterTop:{
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 3,
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
export default News