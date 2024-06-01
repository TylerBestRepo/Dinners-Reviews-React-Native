import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { convertFieldString } from '../enum/fieldStrings';

export default function InputNumberField({ field, onEmit }) {
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');

    const handleTextChange = (text) => {
        const regex = /^\d*\.?\d{0,1}$/;

        if (regex.test(text)) {
            const numberValue = parseFloat(text);

            if (numberValue < 1 || numberValue > 10) {
                setError('Value must be between 1 and 10.');
                onEmit(field, text, false);
            } else {
                setError('');
                setUserInput(text);
                onEmit(field, text, true);
            }
        } else {
            setError('Only one decimal place is allowed.');
            onEmit(field, text, false);
        }
    };

    return (
        <View style={{ flexDirection: "column", alignItems: 'center', gap: 10 }}>
            <Text style={styles.fieldTitles}>
                {convertFieldString(field)}:
            </Text>
            <TextInput 
                style={styles.input}
                value={userInput}
                onChangeText={handleTextChange}
                keyboardType="numeric"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 50,
        margin: 8,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        textAlign: 'center',
    },
    fieldTitles: {
        fontSize: 20,
        fontWeight: '500'
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});
