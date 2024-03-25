
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ApolloClientProvider from "../../providers/ApolloClientProvider";

export default function RootLayout() {

  return (
    <ApolloClientProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Racing" }} />
      </Stack>
      <StatusBar style="light" />
    </ApolloClientProvider>
  );
}
