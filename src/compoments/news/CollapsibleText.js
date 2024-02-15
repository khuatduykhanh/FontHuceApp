import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"

const CollapsibleText = ({ text, maxLength = 100 }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const displayText = collapsed ? text.slice(0, maxLength) : text;

  return (
    <View>
      <Text style={styles.text}>{displayText} {text.length > maxLength && (
        <TouchableOpacity style={styles.seeMore} onPress={toggleCollapse}>
          <Text style={styles.moreLess}>{collapsed ? '... Xem thêm' : 'Thu gọn'}</Text>
        </TouchableOpacity>
      )}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
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
  moreLess: {
    color: 'blue',
    fontFamily: 'Inter',
    fontSize: scaleFontSize(15),
    fontWeight: '400',
  },
  seeMore:{
    marginTop: -2
  }
});

export default CollapsibleText;
