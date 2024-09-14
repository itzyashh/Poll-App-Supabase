import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import polls from '@/data/polls'
import { FontAwesome } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { supabase } from '@/utils/supabase'

const Page = () => {
    const { id } = useLocalSearchParams()

    const [selectedOption, setSelectedOption] = useState<string>()

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{poll?.question}</Text>
            <View style={{ gap: 10 }}>
                {
                    poll?.options.map((option) => (
                        <Pressable onPress={()=> setSelectedOption(option)} key={option} style={styles.optionContainer}>
                            <FontAwesome 
                            name={selectedOption === option ? 'check-circle' : 'circle-thin'}
                            size={24} 
                            color={selectedOption === option ? 'green' : 'black'}/>
                            <Text style={styles.option} key={option}>{option}</Text>
                        </Pressable>
                    ))
                }
            </View>
            <Pressable onPress={()=> setSelectedOption(undefined)}>
                <Text>Clear</Text>
            </Pressable>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20
    },
    question: {
        fontSize: 20,
        fontWeight: '500'
    },
    optionContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    option: {
        fontSize: 16
    }
})