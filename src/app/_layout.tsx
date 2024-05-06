import { Stack } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';


const RootLayout = () => {
    return (

        <Stack
            screenOptions={{ headerTitle: "", animation: "ios" }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'slide_from_right' }} />
        </Stack>


    );
}

export default RootLayout;
