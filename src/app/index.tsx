import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Redirect, router } from "expo-router";


import React from 'react'

const index = () => {
    return (
        <Redirect href="/home"/>

    )
}

export default index
const styles = StyleSheet.create({

})