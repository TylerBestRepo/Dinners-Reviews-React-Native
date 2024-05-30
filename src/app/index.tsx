import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Redirect, router } from "expo-router";
import registerNNPushToken from 'native-notify';


// Might want to do some sort of code check here to redirect to login page if they arent logged in yet

import React from 'react'

const index = () => {
    registerNNPushToken(21206, 'FhEKCTFXyidkxbixUvCS9w');

    return (
        <Redirect href="/home"/>

    )
}

export default index
const styles = StyleSheet.create({

})