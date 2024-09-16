import { POLL, VOTE } from "@/types/db"
import { supabase } from "@/utils/supabase"

const fetchPoll = async (id: number): Promise<POLL | null> => {
    try {
    const { data, error } = await supabase
    .from('polls')
    .select('*')
    .eq('id', id)
    .returns<POLL>()
    .single()
    if (error) {
        console.log(error)
    }
    return data
} catch (error) {
    console.log(error)
    return null
}}

const getVotes = async (poll_id: number): Promise<VOTE[] | null> => {
    const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('poll_id', poll_id)
    .returns<VOTE[]>()
    if (error) {
        console.log(error)
    }
    return data
}




export { fetchPoll, getVotes }