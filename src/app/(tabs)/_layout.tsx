
import { createMaterialTopTabNavigator, 
    MaterialTopTabNavigationOptions, 
    MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'

import { withLayoutContext } from 'expo-router'
import React, { useEffect, useState } from 'react'

import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions,
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
    const [user, setUser] = useState<User | null>(null)
    const [word, setWord] = useState('milk')


    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [])
    return (

        <MaterialTopTabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: '#131620',
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' },
                tabBarIndicatorStyle: { backgroundColor: '#1C87ED' }
            }}>
            <MaterialTopTabs.Screen name="theCrew" options={{ title: "The Crew" }} />
            {/* {word == 'not milk' && <MaterialTopTabs.Screen name="home" options={{ title: "Home" }} />} */}
            <MaterialTopTabs.Screen name="home" options={{ title: "Home" }} />
            <MaterialTopTabs.Screen name="reviewPage" options={{ title: "Review" }} />
            {/* <MaterialTopTabs.Screen name="login" options={{ title: "Login" }} /> */}

        </MaterialTopTabs>
    )
    
}

export default Layout