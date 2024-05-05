import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Redirect, router } from "expo-router";


import React from 'react'

const index = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }]}>
                <Text style={styles.header}>Ahoy</Text>
                    <TouchableOpacity>
                        <Link href='/reviewPage'>Review</Link>
                    </TouchableOpacity>
            
            {/* <TouchableOpacity style={styles.button}>
                <Link href='/reviewPage' style={styles.buttonText}>Review</Link>
            </TouchableOpacity> */}
        </View>
    )
}

export default index
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between', // Align items and justify content for spacing
        marginTop: 20
    },

    header: {
        fontSize: 32,
        fontWeight: "800",
    },
    linkContainer: {
        marginLeft: 'auto', // Move the container to the far right
    },
})