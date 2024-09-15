import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const Page = () => {

    const [title, setTitle] = useState<string>()
    const [options, setOptions] = useState<string[]>(['',''])

    const onClose = (index: number) => {
        const newOptions = [...options]
        newOptions.splice(index, 1)
        setOptions(newOptions)
    }

    const onSubmit = () => {
        console.log({title, options})
    }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create a poll' }} />
    <TextInput
    value={title}
    onChangeText={setTitle}
     placeholder="Title" style={[styles.input, {fontSize: 18}]} />
    <Text style={styles.secondaryHeader}>Options</Text>
    {
        options.map((option, index) => (
            <View key={index} >
            <TextInput
            placeholder={`Option ${index + 1}`} value={option} onChangeText={(text) => {
                const newOptions = [...options]
                newOptions[index] = text
                setOptions(newOptions)
            }} style={[styles.input, {marginBottom:10}]} 
            />
            <AntDesign
            onPress={() => onClose(index)}
             style={styles.close} name="close" size={24} color="black" />
            </View>
        ))
    }
    <Button title="Add option" onPress={() => setOptions([...options, ''])} />
    <Button title="Submit" onPress={onSubmit} />
    
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    secondaryHeader: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    close:{
        position: 'absolute',
        right: 10,
        top: 10,
    }
})