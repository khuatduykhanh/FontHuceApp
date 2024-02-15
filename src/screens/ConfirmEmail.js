import { View, Text } from 'react-native'
import React from 'react'
import {useRoute} from "@react-navigation/native"
import { verifyEmail, sendVerifyEmail} from "../service/auth"
import Confirm from "../compoments/Confirm"
const ConfirmEmail = () => {
  const route = useRoute()
  const {email} = route.params;
  return (
    <Confirm verifyEmail = {verifyEmail} sendVerifyEmail = {sendVerifyEmail} buttonBack = "Signin" buttonConfirm = "Login" email = {email} check = {false} />
  )
}

export default ConfirmEmail