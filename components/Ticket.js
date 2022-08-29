import { Button, Text, View } from 'react-native'
import React from 'react';
import { TailwindProvider } from 'tailwindcss-react-native';

const Ticket = ({navigation}) => {

    return (
      <TailwindProvider>
        <View className="flex-1 items-center ">
          <View className="w-3/4 h-36 bg-indigo-600 rounded mt-20 items-center justify-center">
              <Text className="font-medium text-6xl text-white">
                WILT
              </Text>
          </View>
          <Text className="font-medium text-4xl mt-10">
            Welcome
          </Text>
          <Text className="font-light text-lg mt-2 mx-20 text-center">
            It is time to set up your account and request a event ticket.
          </Text>

          <View className="w-3/5 h-14 bg-indigo-800 rounded-full flex justify-center mt-20">
              <Button className=" text-center font-bold" title='Get Started' color={"white"} />
          </View>

        </View>
      </TailwindProvider> 
    )
  }

export default Ticket