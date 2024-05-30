import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'

import { FIREBASE_AUTH } from '../../../FirebaseConfig'
import { TextInput } from 'react-native-gesture-handler'
import { signInWithEmailAndPassword } from 'firebase/auth'

const login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true)
        try {
            const response = await  signInWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // const signUp = async () => {

    // }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={email} placeholder='email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}/>
      <TextInput style={styles.input} secureTextEntry={true} value={password} placeholder='password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}/>

        { loading ? <ActivityIndicator size="large" color="#000ff" /> 
        : <>
        <Button title="login" onPress={() => signIn()} />
        </>}
    </View>
  )
}

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
    }
})