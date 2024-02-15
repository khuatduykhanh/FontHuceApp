import { SafeAreaView, Text } from 'react-native'
import React,{useEffect} from 'react'
import MainNavigation from "./src/navigation/MainNavigation"
import {Provider} from 'react-redux'
import store from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import { persistor } from "./src/redux/store"
import {PersistGate} from "redux-persist/integration/react" 
import RootNavigation from "./src/navigation/RootNavigation"
const App = () => {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer >
          <RootNavigation />
        </NavigationContainer>
        </PersistGate>
      </Provider>
  )
}


export default App