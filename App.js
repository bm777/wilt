import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native';

export default function App() {
  return (
    <TailwindProvider>
      <Text className="text-amber-700">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </TailwindProvider>
  );
}



