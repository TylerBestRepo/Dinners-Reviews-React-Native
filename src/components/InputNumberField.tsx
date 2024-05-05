import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Button, Keyboard } from 'react-native';
import { convertFieldString } from '../enum/fieldStrings';

export default function inputField({field, onEmit }) {
    const [userInput, setUserInput] = useState('');

    const handleTextChange = (text: string) => {
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(text)) {
            setUserInput(text);
            onEmit(field, text)
        }
        
    };


    return (
        <View style={{ flexDirection: "column", alignItems: 'center', gap: 10 }}>
            <Text style={styles.fieldTitles}>
                { convertFieldString(field) }:
            </Text>
            <TextInput 
            style={styles.input}
            value={userInput}
            onChangeText={handleTextChange}
            keyboardType="numeric"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 40,
      margin: 8,
      borderWidth: 1,
      borderRadius: 12,
      padding: 10,
      textAlign: 'center',
    },
    fieldTitles: {
        fontSize: 20,
        fontWeight: '500'
    }
  });
  
