import { View, Text, StyleSheet, Image, FlatList} from 'react-native'
import React,{useState} from 'react'
import avatar from "../../../assets/img/avatar.png"
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
import UserStory from './UserStory'
import { useDispatch, useSelector } from 'react-redux';
const Story = () => {
  const user = useSelector(state => state.user);
    const data = [
        {
          firstName: 'Tin của bạn',
          id: 1,
          check: true,
          watched: true,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'Angel',
          id: 2,
          check: false,
          watched: true,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'White',
          id: 3,
          check: false,
          watched: false,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'Olivier',
          id: 4,
          check: false,
          watched: false,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'Nata',
          id: 5,
          check: false,
          watched: false,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'Adam',
          id: 6,
          check: false,
          watched: false,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'Sean',
          id: 7,
          check: false,
          watched: false,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'Nicolas',
          id: 8,
          check: false,
          watched: false,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
        {
          firstName: 'Frederic',
          id: 9,
          check: false,
          watched: false,
          image: `http://localhost:8080/api/account/getImage/${user.studentCode}`
        },
      ];
    
    
  return (
    <View style={styles.container}>
        <FlatList
            //when the user scrolls through half of the data call onEndReached function
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            // Set FlatList to display horizontally
            horizontal={true}
            // Pass in data to be rendered in FlatList
            data={data}
            // Define how each item should be rendered
            renderItem={({item}) => <UserStory firstName={item.firstName} check={item.check} watched={item.watched} image={item.image}/>}
          />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 100,
        marginTop: 10,
    },
    
})
export default Story