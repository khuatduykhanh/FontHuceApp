import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Home from "../screens/Home"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import { faBell, faHouse, faUser, faCalendarDays, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons"



function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function Timetable() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }
const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHouse} size={23} />
          ),
        }}
      />
       <Tab.Screen
        name="Timetable"
        component={Timetable}
        options={{
          tabBarLabel: 'Timetable',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCalendarDays} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faArrowTrendUp} size={23}/>
          ),
        }}
      />
      <Tab.Screen
        name="Learning Outcomes"
        component={Profile}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} size={23} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
}
export default HomeNavigation;