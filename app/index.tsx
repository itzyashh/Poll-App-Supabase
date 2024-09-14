import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    id: "1",
    question: "What is your favorite color?",
    options: ["Red", "Green", "Blue"],
  },
  {
    id: "2",
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird"],
  },
  {
    id: "3",
    question: "What is your favorite food?",
    options: ["Pizza", "Burger", "Pasta"],
  },
];

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={DATA}
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
        keyExtractor={(item) => item.id}
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
