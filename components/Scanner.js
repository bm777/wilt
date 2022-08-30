import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TailwindProvider } from "tailwindcss-react-native";



export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setText(data)
    navigation.navigate("Ticket", {qr: text})
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
      <TailwindProvider>
        <View className="w-full h-full">
            <View >
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                // style={{ height: 400, width: 400 }}
                className="w-full h-5/6"
                />
            </View>
            <Text className="text-center text-lg mx-10">{text}</Text>
        </View>
      </TailwindProvider>
    
  );
}