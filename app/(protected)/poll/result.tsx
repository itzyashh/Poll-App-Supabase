import { View, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { POLL, VOTE } from '@/types/db'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPoll, getVotes } from '@/api/polls'
import BarChart from '@/components/BarChart'
import Legend from '@/components/Legend'

const Page = () => {
    const query = useQueryClient()
    const { id } = useLocalSearchParams()

    const { data: poll, isLoading, error } = useQuery({
        queryKey: ['poll', id],
        queryFn: async () => fetchPoll(parseInt(id[0]))
    })

    const { data: votes, isLoading: votesLoading, error: votesError } = useQuery({
        queryKey: ['votes', id],
        queryFn: async () => getVotes(parseInt(id[0]))
    })

    // statistics


    // write proper statistics inside data

    const data = poll?.options.map((option,_index, array) => {
        const votesCount = votes?.filter(vote => vote.option === option).length || 0
        const totalVotes = votes?.length || 0

        // based on the totalVotes, calculate the percentage of votes for each option
        // and store it in the data object

        const percentage = totalVotes > 0 ? (votesCount / totalVotes) * 100 : 0


        return {
            option,
            votesCount,
            percentage,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        }
    }
    )

  return (
    <View style={styles.container}>
      <Legend data={data} />
      <BarChart data={data} />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#030d26"
    }
})