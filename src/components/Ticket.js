/* eslint-disable */
import { Button, Text, View, Alert, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { generateRequest } from './claimer/generateRequest.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Ticket =  ({ navigation, route }) => {
  
  // states --------------------------------------------------------------
  const [setting, setSetting] = useState(false)
  const [status, setStatus] = useState("No Ticket")
  const [explain, setExplain] = useState()
  //
  const [age, setAge] = useState()
  const [name, setName] = useState("")
  // 
  const [mnemonic, setMnemonic] = useState("")
  const [todo, setTodo] = useState("Scan attester")
  const [w3n, setW3n] = useState("None")
  const [did, setDid] = useState("None")
  const [_did, set_Did] = useState("")
  const [_hash, setHash] = useState("None")
  const [qr, setQr] = useState("")
  const [ts, setTs] = useState("")

  // -------------------------------------------------------------------
  let _qr
  try {
    _qr = route.params.qr
  } catch (error) {
    console.log(error)
  }

  /////
  useFocusEffect(
    React.useCallback(() => {
      // is focused

      const setup = async () => {
        try {
          const _s = await AsyncStorage.getItem("@mnemonic")
          setSetting(_s === null ? false : true)
        } catch (error) {console.log(error)}
      }
      const fetchUser = async () => {
        try {
          const savedAge = await AsyncStorage.getItem("@age")
          const savedName = await AsyncStorage.getItem("@name")
          const savedTicket = await AsyncStorage.getItem("@ticket")
          setAge(savedAge)
          setName(savedName)
          setTs(savedTicket)
        } catch (error) {}
      }
      const fetchMnemonic = async () => {
        try {
          const savedMnemonic = await AsyncStorage.getItem("@mnemonic")
          setMnemonic(savedMnemonic)
        } catch (error) {}
      }
      const fetchDid = async () => {
        try {
          const savedDid = await AsyncStorage.getItem("@lightdid")
          set_Did(JSON.parse(savedDid))
          if(savedDid.length >= 10)
            setDid(savedDid.slice(0, 16)+"...\"}")
        } catch (error) {}
      }
      ////////
      ////////
      setup()
      fetchMnemonic()
      fetchDid()
      fetchUser()

      

      return () => {
        // is unfocesed: come from another screen

        const setup = async () => {
          try {        
            const _s = await AsyncStorage.getItem("@mnemonic")
            setSetting(_s === null ? false :  true)
          } catch (error) {console.log(error)}
        }


        setup()
        // interactKilt()
      }
    }, [])
  )

  // handle
  const handleStart = () => {
    // navigation.navigate("Scanner")
    navigation.navigate("Profile")
  }
  const handleTicket = async () => {
      // console.log("on handle",_qr, ts, name, age)
      if (status === "No Ticket") {
        if(todo === "Scan attester"){
          setTodo("Request Ticket")
          navigation.navigate("Scanner", {
            params: {current: "attester" } // attester
          })
          
        }else if(todo === "Request Ticket"){
          // console.log({"name": name, "age": age}, mnemonic)
          const request = await generateRequest({"name": name, "age": age}, mnemonic)
          console.log(JSON.stringify(request))
          await fetch(_qr, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({request: request}),
          })
            .then(response => response.json())
            .then(data => setExplain(JSON.stringify(data)))
          setTodo("Scan verifier")
          setStatus("Ticket Attested")
        }
      }
      else if (status === "Ticket Attested") {
        if(todo === "Scan verifier"){
          setTodo("Request Review")
          navigation.navigate("Scanner", {
            params: {current: "verifier" } // verifier
          })
          
        }else if(todo === "Request Review"){
          setTodo("Enjoy")
          setStatus("Ticket Verified")
        }
      }
  }
  // showDid()
  const showDid = () => {
    Alert.alert("lightDid URI", _did.uri, [{
      text: "CLOSE"
  }])
  }

    return (
      <>
        {
          (setting )
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
                    <TouchableOpacity onPress={showDid}>
                        <Text className="font-medium text-lg text-[#D28BC3] mt-1 text-left ml-3">
                          DID 
                        </Text>
                        <Text className="font-semibold text-2xl text-[#DBD3D0] mt-1 text-left ml-3">
                          {did}
                        </Text>
                    </TouchableOpacity>
                      
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
              <Text className="font-medium text-lg text-slate-500 text-center mt-2 mx-5">
                {explain}
              </Text>
              <View className="w-full h-full mt-10 items-center">
                  <View className="w-11/12 h-16 bg-[#861F64] mt-10 rounded-lg justify-center ">
                        <Button color="white" className="font-medium text-lg" title={todo} onPress={handleTicket}>
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
        

        
      </> 
    )
  }

export default Ticket