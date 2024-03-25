import { Stack } from "expo-router";
import ApolloClientProvider from "../providers/ApolloClientProvider";
import { View, Text, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <ApolloClientProvider
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      > 
        <Stack.Screen name="index" />
      </Stack>
    </ApolloClientProvider>
  );
}
