import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./components/Profile.js"
import Ticket from "./components/Ticket.js"


// the Bottom Navigator
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({tabBarIcon: ({focused, color, size}) => {
          let iconName
          if (route.name === "Ticket"){
            iconName = focused
              ? "ios-bandage-sharp"
              : "ios-bandage-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline"
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: "indigo",
        tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen name='Ticket' component={Ticket}></Tab.Screen>
        <Tab.Screen name='Profile' component={Profile}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}



