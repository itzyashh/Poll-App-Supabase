import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { supabase } from '@/utils/supabase'
import { Redirect } from 'expo-router'
import Spinner from 'react-native-loading-spinner-overlay'

const Page = () => {
    const { user } = useAuth()
    const [loading, setLoading] = React.useState(false)

    const onSignOut = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error logging out:', error.message)
        }
        setLoading(false)
    }
    
    return (
        
        
        <View>
      <Spinner visible={loading} overlayColor='rgba(0,0,0,0.5)' />
      <Text>{user?.id}</Text>
        <Button
        disabled={loading}
        title="Sign Out" onPress={onSignOut} />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})