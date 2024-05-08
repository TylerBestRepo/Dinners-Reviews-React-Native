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

import { View, Text, Image, StyleSheet, Animated, Easing, TouchableOpacity, ImageStyle } from 'react-native'
import { Audio } from 'expo-av'; // Import Audio from Expo AV for sound playback
import React, { useRef, useState, useEffect } from 'react'
import { Stack } from 'expo-router'
import { tinoImg, tinoMoan } from '../assets/index';

const Layout = () => {
    const animation = useRef(new Animated.Value(0)).current;

    const playSound = async () => {
        try {
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync(tinoMoan);
            await soundObject.playAsync();

            // Start animation
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: -1,
                        duration: 600,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start();
        } catch (error) {
            console.error('Error playing sound: ', error);
        }
    };

    const interpolatedTransformAnimation = animation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [1.1, 1, 1.5],
    });

    const interpolatedRotateAnimation = animation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-40deg', '40deg'],
    });

    const animatedStyle: Animated.WithAnimatedObject<ImageStyle> = {
        transform: [
            { scale: interpolatedTransformAnimation },
            { rotate: interpolatedRotateAnimation },
        ],
    };
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerLeft: () => (
                <View style={styles.container}>
                    <Text style={styles.header}>Dinner Reviews</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.centerImage}>
                    <TouchableOpacity onPress={playSound}>
                    <Animated.Image borderRadius={6}
                            source={tinoImg}
                            style={[
                                {
                                    height: 60,
                                    width: 50,
                                    resizeMode: 'cover',
                                    borderRadius: 30
                                },
                                animatedStyle
                            ]}

                        />
                    </TouchableOpacity>

                </View>
                
            ),
            headerTitle: () => (
                <Text></Text>
            ),
            headerShadowVisible: false,
        }}>
            <Stack.Screen name='(tabs)' />
        </Stack>
    )
}

export default Layout
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingRight: 10,
        paddingTop: 8,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start', // Align items and justify content for spacing
        // marginTop: 20
    },

    header: {
        fontSize: 32,
        fontWeight: "800",
    },
    centerImage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }


})