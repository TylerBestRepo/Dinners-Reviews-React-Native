import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <Stack
            screenOptions={{ headerTitle: "" }}>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="reviewPage"/>

            </Stack>
    );
}

export default RootLayout;
