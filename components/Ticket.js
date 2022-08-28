import { Button, Text, View } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native';

const Ticket = () => {
    return (
      <TailwindProvider>
        <View className="flex-1 items-center justify-center">
          <Text >Ticket Screen</Text>

        </View>
      </TailwindProvider> 
    )
  }

export default Ticket