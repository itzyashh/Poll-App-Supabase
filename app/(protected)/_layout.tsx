import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

const Layout = () => {
    const { user } = useAuth()

    if (!user) {
        return <Redirect  href="/(auth)/login" />
    }
  return (
    <Stack />
  )
}

export default Layout