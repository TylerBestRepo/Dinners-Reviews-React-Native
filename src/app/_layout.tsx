// import { Stack } from "expo-router";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';


// const RootLayout = () => {
//     return (

//         <Stack
//             screenOptions={{ headerTitle: "", animation: "ios" }}>
//             <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'slide_from_right' }} />
//         </Stack>


//     );
// }

// export default RootLayout;\

import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { tinoImg } from '../assets/index';

const Layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerTitle: () => (
                <Image
                    source={tinoImg}
                    style={{
                        height: 60,
                        width: 50,
                        resizeMode: 'cover',
                        borderRadius: 30
                    }}
                />
            ),
            headerShadowVisible: false,
        }}>
            <Stack.Screen name='(tabs)' />
        </Stack>
    )
}

export default Layout