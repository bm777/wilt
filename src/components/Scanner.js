/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";


export default function Scanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Please scan the Qr code");

let _
  try {
    const isAttester = JSON.stringify(route).includes(JSON.stringify({params: {current: "attester"}}))
    const isVerifier = JSON.stringify(route).includes(JSON.stringify({params: {current: "verifier"}}))
      _ = isAttester || isVerifier
  } catch {
    _ = false
  }


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, [])

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setText(data)

    if(_ && text.split("/").length >= 4){
        const value = text.split("/")[4]
        if(value === "attester" || value === "verifier"){
          navigation.navigate("Ticket", {qr: text})
        }else{
          // setText("Please scan a valid Attester or Verifier QRCcode")
        }
    }else{
      // setText("Please scan a valid Attester or Verifier QRCcode")
    }
    
    
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View >
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View >
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <>
      <View className="w-full h-full">
            <View >
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                className="w-full h-5/6"
                />
            </View>
            <Text className="text-center text-lg mx-10"> {text} </Text>
        </View>
    </>
        
    
  );
}