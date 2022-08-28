import React from 'react';
import { Button, Text, View } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

function Ticket({ navigation }){
  return (
    <TailwindProvider>
      <View className="flex-1 items-center justify-center">
        <Text >Ticket</Text>
        
      </View>
    </TailwindProvider> 
  )
}
function Profile({ navigation }){
  return (
    <TailwindProvider>
      <View className="flex-1 items-center justify-center">
        <Text>Profile</Text>
        
      </View>
      
    </TailwindProvider> 
  )
}

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
              ? "ios-information-circle"
              : "ios-information-circle-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-list-box" : "ios-list"
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen name='Ticket' component={Ticket}></Tab.Screen>
        <Tab.Screen name='Profile' component={Profile}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}



