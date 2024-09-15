import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

const AuthLayout = () => {

    const { user } = useAuth()

    if (user) {
        return <Redirect href="/(protected)" />
    }


  return (
    <Stack>
        <Stack.Screen name="login" options={{ title: 'Login' }} />
    </Stack>
  )
}

export default AuthLayout