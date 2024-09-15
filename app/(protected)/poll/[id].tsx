import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { supabase } from '@/utils/supabase'
import { POLL, VOTE } from '@/types/db'
import Spinner from 'react-native-loading-spinner-overlay'
import { useAuth } from '@/providers/AuthProvider'

const Page = () => {
    const { id } = useLocalSearchParams()
    const { user } = useAuth()
    const [poll, setPoll] = useState<POLL>()
    const [selectedOption, setSelectedOption] = useState<string>()
    const [userVote, setUserVote] = useState<VOTE>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchPoll = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('polls')
                .select('*')
                .eq('id', id)
                .single()
            if (error) {
                console.log(error)
            }
            setPoll(data)
            setLoading(false)
            
        }

        const fetchVote = async () => {

            if (!user) {
                return
            }

            const { data, error } = await supabase
                .from('votes')
                .select('*')
                .eq('poll_id', id)
                .eq('user_id', user?.id)
                .limit(1)
                .order('created_at', { ascending: false })
                .single()
            if (error) {
                console.log(error)
            }
            setUserVote(data)
            setSelectedOption(data?.option)
        }
        fetchPoll()
        fetchVote()

    }, [id])

    const onSubmit = async () => {
        const newVote = {
            poll_id: id,
            option: selectedOption,
            user_id: user?.id
        }

        if (userVote) {
            newVote.id = userVote.id
        }
        setLoading(true)
        if (!selectedOption) {
            return
        }
        const { data, error } = await supabase
            .from('votes')
            .upsert([newVote])
            .select('*')
            .single()

            setUserVote(data)
            
        if (error) {
            console.log(error)
            alert('An error occurred')
        }
        setLoading(false)
    }


 


    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
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

            <Pressable
            disabled={!selectedOption}
             onPress={onSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText} >Submit</Text>
            </Pressable>



     { poll?.author && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text>Author: {poll?.author}</Text>
            </View>}
               



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
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16
    }
})