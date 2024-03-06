import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView,FlatList } from 'react-native'
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
  const data = [
    {
      id: 1,
      image: true,
      cap: "Núi ấp ôm mây, mây ấp núi Lòng sông gương sáng bụi không mờ. Bồi hồi dạo bước Tây Phong Lĩnh.Trông lại trời Nam nhớ bạn xưa"
    },
    {
      id: 2,
      image: true,
      cap: "Núi ấp ôm mây, mây ấp núi Lòng sông gương sáng bụi không mờ. Bồi hồi dạo bước Tây Phong Lĩnh.Trông lại trời Nam nhớ bạn xưa"
    },
    {
      id: 3,
      image: false,
      cap: "Núi ấp ôm mây, mây ấp núi Lòng sông gương sáng bụi không mờ. Bồi hồi dạo bước Tây Phong Lĩnh.Trông lại trời Nam nhớ bạn xưa"
    },
  ]
  return (
    <SafeAreaView style={{ marginBottom: 60 }}>
        <TopBar/>
        <ScrollView>
          <Post />
          <Story /> 
          {/* <FlatList
            //when the user scrolls through half of the data call onEndReached function
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.id.toString()}
            data={data}
            // Define how each item should be rendered
            renderItem={({item}) => <News image={item.image} cap={item.cap}/>}
          /> */}
          {
          data.map((item)=> <News key={item.id} image={item.image} cap={item.cap}/>)
          } 
        </ScrollView>
    </SafeAreaView>
  )
}
export default Home