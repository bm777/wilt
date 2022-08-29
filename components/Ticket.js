import { Button, Text, View } from 'react-native'
import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { TailwindProvider } from 'tailwindcss-react-native';

const Ticket = ({ navigation, route }) => {
  let setting
  try {
    setting = JSON.stringify(route).includes(JSON.stringify({setting: "done"}))
  } catch {
    setting = false
  }
  
  // states
  const [status, setStatus] = useState("No Ticket")
  const [explain, setExplain] = useState("")
  const [todo, setTodo] = useState("Request Ticket")
  const [w3n, setW3n] = useState("")
  const [did, setDid] = useState("")
  const [_hash, setHash] = useState("")


  // handle
  const handleStart = () => {
    navigation.navigate("Profile")
  }
  const handleSpeed = () => {

  }

    return (
      <TailwindProvider>
        {
          (setting)
          ?
          <View className="flex-1 items-center">
            <View className="w-11/12 h-3/5 bg-[#353164] rounded mt-10 items-center  ">
                <Text className="font-bold text-5xl text-[#CD0E6B] mt-5 inline-block">
                  Event <Text className="text-white">Ticket</Text>
                </Text>

                <View className="w-full h-24 mt-12 flex-row ">
                  <View className="h-5/6 w-32 bg-[#861F64] rounded-xl ml-3">
                      <Text className="font-medium text-lg text-[#D28BC3] mt-1 text-left ml-3">
                        W3N 
                      </Text>
                      <Text className="font-semibold text-2xl text-[#DBD3D0] mt-1 text-left ml-3">
                        {w3n} 
                      </Text>
                  </View>
                  <View className="h-5/6 w-32 bg-[#861F64] grow mx-3 rounded-lg">
                      <Text className="font-medium text-lg text-[#D28BC3] mt-1 text-left ml-3">
                        DID 
                      </Text>
                      <Text className="font-semibold text-2xl text-[#DBD3D0] mt-1 text-left ml-3">
                        {did}
                      </Text>
                  </View>
                </View>

                {/* ------------------------------------------------ */}
                {/* <View className="h-1 bg-white w-full border-2 border-dashed border-orange-500"></View> */}
                  {/* ------------------------------------------------ */}
                
                <View className="w-11/12 h-14 bg-[#861F64] mt-1  items-start justify-center rounded-lg">
                    <Text className="font-medium text-lg text-[#D28BC3] inline ml-3">
                      Hash :{" "}
                      <Text className="font-medium text-2xl text-[#DBD3D0] ">
                        {_hash}
                      </Text>
                    </Text>
                    
                </View>

                <View className="w-full h-28 bg-white mt-10  border-t-4 border-pink-500">
                      <Text className="font-medium text-lg text-[#D28BC3] mt-1 text-left ml-5">
                        STATUS 
                      </Text>
                      <Text className="font-bold text-2xl text-slate-600 mt-1 ml-3 text-center">
                        {status}
                      </Text>
                </View>
              </View>
              <Text className="font-medium text-lg text-[#583250] text-center mt-2 ">
                {explain} 
              </Text>
              <View className="w-full h-full mt-12 items-center">
                  <View className="w-11/12 h-16 bg-[#861F64] mt-12 rounded-lg justify-center ">
                        <Button color="white" className="font-medium text-lg" title={todo} onPress={handleSpeed}>
                        </Button>
                  </View>
                    
              </View>
          </View>
          :
          <View className="flex-1 items-center">
            <View className="w-3/4 h-36 bg-indigo-600 rounded-xl mt-20 items-center justify-center">
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
                <Button className=" text-center font-bold" title='Get Started' color={"white"} onPress={handleStart}/>
            </View>
          </View>
          
        }

        
      </TailwindProvider> 
    )
  }

export default Ticket