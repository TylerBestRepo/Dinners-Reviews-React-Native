import { Link, router } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
    View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback,
    ScrollView, SafeAreaView, KeyboardAvoidingView, Platform
} from "react-native";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InputNumberField from '../../components/InputNumberField'
import InputTextField from '../../components/InputTextField'
import { SelectList } from 'react-native-dropdown-select-list'

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { useMemo } from 'react';

import PreviousReviews from "../components/previousReviews";

import { FIREBASE_DB } from "../../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { IMembers, IHostedDinners, IReviewInput } from "../../interfaces";
import { getMembers, getNextDinner, getMysteryQ } from "../../api/gets";


export default function reviewPage() {
    const snapPoints = useMemo(() => ['50%', '70%', '85%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleClosePress = () => bottomSheetRef.current?.close();
    const handleOpenPress = () => bottomSheetRef.current?.expand();
    const handleCollapsePress = () => bottomSheetRef.current?.collapse();
    const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    const membersRef = collection(FIREBASE_DB, "members")

    const insets = useSafeAreaInsets();

    const [inputFields, setInputFieldData] = useState<IReviewInput>({
        reviewer: '',
        cook: '',
        entreeRating: 0,
        mainRating: 0,
        dessertRating: 0,
        entertainmentRating: 0,
        mysteryQ: '',
        writtenReview: '',
        mysteryQuestionType: '',
        mysteryAnswer: '',
        mysteryRating: 0
    })

    const [selected, setSelected] = useState("");
    const [allFieldsFilled, setAllFieldsFilled] = useState(false);
    const [members, setMembers] = useState<IMembers[]>([]); // Initialize state for members array
    const [nextDinner, setNextDinner] = useState<IHostedDinners>(); // Initialize state for members array
    const [memberNames, setMemberNames] = useState([])

    useEffect(() => {
        // Call the getMembers function when the component mounts
        const fetchMembers = async () => {
            try {
                const membersArray = await getMembers();
                setMembers(membersArray); // Set state with the returned array
                const names = membersArray.map((member) => member.name);
                setMemberNames(names); // Set state with member names

                const nextDinner = await getNextDinner();
                setNextDinner(nextDinner)
                
                const mysteryQ = await getMysteryQ(nextDinner.season,nextDinner.weekNumber);
                setInputFieldData(prevState => ({
                    ...prevState,
                    mysteryQ: mysteryQ.mysteryQuestion,
                    mysteryQuestionType: mysteryQ.mysteryQuestionType
                }));

            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const handleDropdownSelection = (field, data) => {
        setInputFieldData(prevState => ({
            ...prevState,
            [field]: data
        }));
    }

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
        // inputFields.reviewer !== '' && inputFields.cook !== '' &&
        if (inputFields.entreeRating !== 0 && inputFields.mainRating !== 0 && inputFields.dessertRating !== 0 && inputFields.entertainmentRating !== 0) {
            setAllFieldsFilled(true);
        } else {
            setAllFieldsFilled(false);
        }
    }, [inputFields]);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <GestureHandlerRootView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>

                    <View style={[styles.container, {
                        paddingTop: 15,
                    }]}>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust the offset as needed
                        >
                            <ScrollView
                                contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
                                style={styles.scrollContainer}>


                                <View style={styles.header}>
                                    <View style={{ width: '30%' }}></View>
                                    <Text style={styles.headerTitle}>It's Review Time!</Text>
                                    <TouchableOpacity onPress={handleOpenPress} style={[styles.buttonContainer]}>
                                        <Text style={styles.buttonText}>Previous</Text>
                                    </TouchableOpacity>
                                </View>



                                <View style={styles.dropdownContainer}>
                                    <View style={styles.dropdownContainer}>
                                        {memberNames.length > 0 && <SelectList
                                            setSelected={(val) => handleDropdownSelection("reviewer", val)}
                                            data={memberNames}
                                            save="value"
                                            placeholder="Eater"
                                            boxStyles={{ width: '50%', alignItems: 'center' }}
                                            search={false}
                                        />}
                                    </View>

                                    {inputFields.reviewer !== '' && <SelectList
                                        setSelected={(val) => handleDropdownSelection("cook", val)}
                                        data={memberNames}
                                        save="value"
                                        placeholder="Cook"
                                        boxStyles={{ width: '50%' }}
                                        search={false}
                                    />}
                                </View>

                                <View>
                                    {inputFields.cook !== '' && <InputNumberField field="entreeRating" onEmit={handleChildData} />}
                                    {inputFields.entreeRating != 0 && <InputNumberField field="mainRating" onEmit={handleChildData} />}
                                    {inputFields.mainRating != 0 && <InputNumberField field="dessertRating" onEmit={handleChildData} />}
                                    {inputFields.dessertRating != 0 && <InputNumberField field="entertainmentRating" onEmit={handleChildData} />}

                                    {inputFields.entertainmentRating != 0 && <InputTextField field="writtenReview" onEmit={handleChildData} />}

                                    {inputFields.writtenReview != '' && inputFields.mysteryQ && inputFields.mysteryQuestionType == 'written' && 
                                    <InputTextField field="mysteryQuestion" mysteryQuestion={inputFields.mysteryQ} onEmit={handleChildData} />}
                                </View>

                                {/* <Button title="Submit"
                onPress={logInputs} /> */}
                                {allFieldsFilled == true && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 16, paddingBottom: 200 }}>
                                    <TouchableOpacity style={styles.button} onPress={logInputs}>
                                        <Text style={styles.button}>Submit</Text>
                                    </TouchableOpacity>
                                </View>}
                            </ScrollView>
                        </KeyboardAvoidingView>


                    </View>
                </TouchableWithoutFeedback>


                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{ backgroundColor: '#808080' }}
                    backgroundStyle={{ backgroundColor: '#fff' }}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.contentContainer}>
                        <PreviousReviews />
                        {/* <Button title="Close" onPress={handleClosePress} /> */}
                    </View>
                </BottomSheet>
            </GestureHandlerRootView>
        </SafeAreaView>



    );
}
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 80
    },
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0,
        gap: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between", // Adjusted to space between
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20, // Adjusted padding
        paddingVertical: 20, // Adjusted padding
    },
    headerTitle: {
        fontSize: 20,
        marginRight: 18,
        fontWeight: '700',
        color: "black",
    },
    dropdownContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        gap: 16,
        marginBottom: 16
    },
    button: {
        fontSize: 20,
        color: 'black',
        backgroundColor: '#ADD8E6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    containerHeadline: {
        fontSize: 24,
        fontWeight: '600',
        padding: 20,
        color: '#fff'
    },
    previousButton: {
        paddingTop: 4,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#ADD8E6', // Blue border color
        borderRadius: 10, // Rounded corners
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ADD8E6', // Blue text color
    },

});
