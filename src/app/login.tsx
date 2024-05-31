import { ActivityIndicator, StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'

import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true)
        try {
            console.log("email sent through: ", email)
            console.log("password sent through: ", password)
            const response = await  signInWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (error) {
            console.log(error)
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false)
        }
    }
    const signUp = async () => {
        setLoading(true)
        try {
            console.log("email sent through: ", email)
            console.log("password sent through: ", password)
            const response = await  createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (error) {
            console.log(error)
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    // const signUp = async () => {

    // }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder='email'
                        autoCapitalize='none'
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        placeholder='password'
                        autoCapitalize='none'
                        onChangeText={(text) => setPassword(text)}
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            <Button title="Login" onPress={signIn} />
                            <Button title="Create account" onPress={signUp} />
                        </>
                        
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


export default login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: 'center',
    },
})