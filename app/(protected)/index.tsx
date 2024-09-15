import { supabase } from "@/utils/supabase";
import { AntDesign } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Database } from '@/types/supabase';
import { POLL } from "@/types/db";



export default function Index() {

  const [polls, setPolls] = useState<POLL[]>([]);

  useEffect(() => {
    

    const fetchPolls = async () => {
      let { data, error } = await supabase
        .from('polls')
        .select('*')
        .returns<POLL[]>();
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setPolls(data);

    }
    fetchPolls();

  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <Redirect href={"/(auth)/login"} /> */}
      <Stack.Screen options={{ 
        title: "Polls",
        headerRight: () => (
          <Link href={'/poll/new'} asChild>
            <Pressable>
            <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
          </Link>
        ),
        headerLeft: () => (
          <Link href={'/profile'} asChild>
            <Pressable>
            <AntDesign name="user" size={24} color="black" />
            </Pressable>
          </Link>
        )
         }} />
      <FlatList
        data={polls}
        contentContainerStyle={{
          gap: 20,
        }}
        style={{ padding: 20 }}
        renderItem={({item}) => (
          <Link href={`/poll/${item.id}`} asChild >
          <Pressable style={styles.pollContainer}>
            <Text>{item.question}</Text>
          </Pressable>
          </Link>
          )
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pollContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
