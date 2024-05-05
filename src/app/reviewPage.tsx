import { Link, router } from "expo-router";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InputNumberField from '../components/InputNumberField'
import { SelectList } from 'react-native-dropdown-select-list'

import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { IMembers, IHostedDinners, IReviewInput } from "../interfaces";
import { getMembers } from "../api/gets";
export default function HomeScreen() {

    const membersRef = collection(FIREBASE_DB, "members")

    const insets = useSafeAreaInsets();

    const [inputFields, setInputFieldData] = useState<IReviewInput>({
        reviewer: '',
        cook: '',
        entreeRating: 0,
        mainRating: 0,
        dessertRating: 0,
        entertainmentRating: 0
    })

    const [selected, setSelected] = useState("");
    const [allFieldsFilled, setAllFieldsFilled] = useState(false);
    const [members, setMembers] = useState<IMembers[]>([]); // Initialize state for members array
    const [memberNames, setMemberNames] = useState([])

    useEffect(() => {
        // Call the getMembers function when the component mounts
        const fetchMembers = async () => {
            try {
                const membersArray = await getMembers();
                setMembers(membersArray); // Set state with the returned array
                const names = membersArray.map((member) => member.name);
                setMemberNames(names); // Set state with member names
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };
    
        fetchMembers();
    }, []);
    

    const handleChildData = (field, data) => {
        setInputFieldData(prevState => ({
            ...prevState,
            [field]: data
        }));
    }

    const logInputs = () => {
        console.log("inputs: ", inputFields)
    }

    const logMembers = () => {
        onSnapshot(membersRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().name)
            })
        })
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    // Check if all input fields are filled
    useEffect(() => {
        if (inputFields.reviewer !== '' && inputFields.cook !== '' && inputFields.entreeRating !== 0 && inputFields.mainRating !== 0 && inputFields.dessertRating !== 0 && inputFields.entertainmentRating !== 0) {
            setAllFieldsFilled(true);
        } else {
            setAllFieldsFilled(false);
        }
    }, [inputFields]);

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>

            <View style={[styles.container, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }]}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Dinner Review App</Text>
                </View>

                <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownContainer}>
                        {memberNames.length > 0 && <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={memberNames}
                            save="value"
                            placeholder="Eater"
                            boxStyles={{ width: '50%', alignItems: 'center' }}
                            search={false}
                        />}
                    </View>

                    {<SelectList
                        setSelected={(val) => setSelected(val)}
                        data={memberNames}
                        save="value"
                        placeholder="Cook"
                        boxStyles={{ width: '50%' }}
                        search={false}
                    />}
                </View>

                <View>
                    {<InputNumberField field="entreeRating" onEmit={handleChildData} />}
                    {inputFields.entreeRating != 0 && <InputNumberField field="mainRating" onEmit={handleChildData} />}
                    {inputFields.mainRating != 0 && <InputNumberField field="dessertRating" onEmit={handleChildData} />}
                    {inputFields.dessertRating != 0 && <InputNumberField field="entertainmentRating" onEmit={handleChildData} />}
                </View>



                {/* <Button title="Submit"
                onPress={logInputs} /> */}
                {allFieldsFilled == true && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 16 }}>
                    <TouchableOpacity style={styles.button} onPress={logInputs}>
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                </View>}

                <Button title="log members" onPress={logMembers} />


                {/* {foodLogData && <FlatList
                data={foodLogData.food_logByUser_idAndDate}
                contentContainerStyle={{ gap: 5 }}
                renderItem={({ item }) => <FoodLogListItem item={item} />}
            />} */}
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0, 
        gap: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 20,
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 0, 
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: "black",
        paddingVertical: 20,
        
    },
    dropdownContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        gap: 16
    },
    button: {
        fontSize: 20, 
        color: 'black', 
        backgroundColor: '#ADD8E6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    }
});
