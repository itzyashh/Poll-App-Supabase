import AuthProvider from "@/providers/AuthProvider";
import { supabase } from "@/utils/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {

  const query = new QueryClient()

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={query}>
    <AuthProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"(auth)"} 
      options={{ headerShown: false }}
      />
    </Stack>
    </AuthProvider>
    </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
