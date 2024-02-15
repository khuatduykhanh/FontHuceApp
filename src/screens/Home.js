import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {horizontalScale, verticalScale, scaleFontSize} from "../utils/scaling"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import messager from "../../assets/img/messager.png"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import TopBar from "../compoments/news/TopBar"
import Post from "../compoments/news/Post"
import Story from '../compoments/news/Story';
import News from "../compoments/news/News"
const Home = () => {
  return (
    <SafeAreaView>
        <TopBar/>
        <ScrollView>
          <Post />
          <Story /> 
          <News image={true} />
          <News image={true} />
          <News image={false} />
        </ScrollView>
    </SafeAreaView>
  )
}
export default Home