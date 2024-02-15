import { View, Text } from 'react-native'
import React from 'react'
import Confirm from "../compoments/Confirm"
import {useRoute} from "@react-navigation/native"
import { verifyTokenPassword, sendVerifyTokenPassword} from "../service/auth"
const ConfirmForgotPassword = () => {
    const route = useRoute()
    const {email} = route.params;
  return (
    <Confirm buttonBack = "ForgotPassword" email={email} verifyEmail = {verifyTokenPassword} check = {true} sendVerifyEmail = {sendVerifyTokenPassword} buttonConfirm = "NewPassword"/>
  )
}

export default ConfirmForgotPassword