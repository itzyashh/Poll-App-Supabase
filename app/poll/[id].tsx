import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
    const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>Poll Details : {id}</Text>
    </View>
  )
}

export default Page