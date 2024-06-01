import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Redirect, router } from "expo-router";
import registerNNPushToken from 'native-notify';



// Might want to do some sort of code check here to redirect to login page if they arent logged in yet

import React, { useEffect, useState } from 'react'
// import login from './(tabs)/login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import login from './login';
import Layout from './(tabs)/_layout';

const index = () => {
    registerNNPushToken(21206, 'FhEKCTFXyidkxbixUvCS9w');
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [])

    return (
        <Redirect href="/home" />


            // <Stack.Navigator>
            //     {user ? (
            //         <Stack.Screen name="signIn" component={login}/>
            //     ) : (
            //         <Stack.Screen name="layout" component={Layout}/>

            //     )}
            // </Stack.Navigator>


    )



}

export default index
const styles = StyleSheet.create({

})
