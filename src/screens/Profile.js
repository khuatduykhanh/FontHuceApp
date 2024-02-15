import { View, Text ,TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from "../redux/reducers/User"
import {useNavigation} from "@react-navigation/native"
const Profile = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleLogOut = () =>{
        dispatch(logOut())
        // navigation.navigate('Login')
    }
  return (
    <SafeAreaView>
        <TouchableOpacity style={styles.test} onPress={handleLogOut}>
            <Text>Profile</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    test:{
        justifyContent: "center",
        alignContent: "center"
    }
})
export default Profile