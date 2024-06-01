import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { convertFieldString } from '../enum/fieldStrings';

export default function InputField({ field, onEmit, mysteryQuestion }: { field: string; onEmit: (field: any, data: any) => void; mysteryQuestion?: string | null }) {
    const [userInput, setUserInput] = useState('');

    const handleTextChange = (text) => {
        setUserInput(text);
        onEmit(field, text);
    };

    return (
        <View style={{ flexDirection: "column", alignItems: 'center', gap: 10 }}>
            {mysteryQuestion !== undefined ? (
                <Text style={styles.fieldTitlesMystery}>{mysteryQuestion}</Text>
            ) : (
                <Text style={styles.fieldTitles}>
                    {convertFieldString(field)}:
                </Text>
            )}
            <TextInput
                style={styles.input}
                value={userInput}
                onChangeText={handleTextChange}
                multiline={true} // Enable multiline
                numberOfLines={4} // Set the initial number of lines (optional)
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        minHeight: 40, // Set minimum height
        width: 320, // Adjust width as needed
        margin: 8,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
    },
    fieldTitles: {
        fontSize: 20,
        fontWeight: '500'
    },
    fieldTitlesMystery: {
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 100
    }
});
