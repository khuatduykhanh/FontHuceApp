import { View, Text,StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
import avatar from '../../../assets/img/avatar.png'
import CollapsibleText from "./CollapsibleText"
import PostImages from "./PostImages"
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const isSmall = width <= 375 && !DeviceInfo.hasNotch();
const News = props => {
    const longText = 'Nội dung dài cần được thu gọn hoặc mở rộng khi cần thiết. Nội dung dài cần được thu gọn hoặc mở rộng khi cần thiết.Nội dung dài cần được thu gọn hoặc mở rộng khi cần thiết.Nội dung dài cần được thu gọn hoặc mở rộng khi cần thiết.';
    const postImages = [
        avatar,
        avatar,
        avatar,
      ];
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
                <FontAwesomeIcon icon={faEarthAsia} style={{color: "#474748",}} size={12}  />
                </View>
            </View>
        </View>
        <View style={styles.containerCap}>
             {/* <Text numberOfLines={3} style={styles.cap}>Info Launching org reactjs native example HuceApp mons nhon moix ngay voi hajt name cowf no Đây là một thuộc tính CSS không tiêu chuẩn, thường được sử dụng để giới hạn số dòng hiển thị của một phần tử. Trong trường hợp này, nó được sử dụng để giới hạn văn bản chỉ hiển thị tối đa 3 dòng.</Text> */}
            <CollapsibleText text={longText} maxLength={150} />
        </View>
        {props.image && (<Image source={avatar} style={styles.imageCap}>

        </Image>)}
        {/* <PostImages images={postImages} /> */}
      </View>
    </View>
  )
}
News.propTypes = {
    // The first name of the user as a required string
    image: PropTypes.bool.isRequired,
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
    }
})
export default News