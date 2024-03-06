import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation,useRoute} from "@react-navigation/native"
const Chat = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text>Chat</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Chat