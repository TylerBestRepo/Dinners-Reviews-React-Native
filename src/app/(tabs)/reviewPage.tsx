import { Link, router } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
    View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback,
    ScrollView, SafeAreaView, KeyboardAvoidingView, Platform
} from "react-native";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Easing, FadeIn, FadeOut, Layout } from 'react-native-reanimated';

import InputNumberField from '../../components/InputNumberField'
import InputTextField from '../../components/InputTextField'
import { SelectList } from 'react-native-dropdown-select-list'
import { User, onAuthStateChanged } from 'firebase/auth';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import PreviousReviews from "../components/previousReviews";
import { FIREBASE_DB } from "../../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { IMembers, IHostedDinners, IReviewInput } from "../../interfaces";
import { getMembers, getNextDinner, getMysteryQ, getTodaysDinner, getMyReviews } from "../../api/gets";
import { addReview } from "../../api/posts";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import Login from "../login";
import { getFollowMaster } from "native-notify";

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

    const [user, setUser] = useState<User | null>(null)
    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [])

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
        mysteryRating: -1,
        weekNumber: 0,
        season: 0
    })

    const [selected, setSelected] = useState("");
    const [allFieldsFilled, setAllFieldsFilled] = useState(false);
    const [members, setMembers] = useState<IMembers[]>([]); // Initialize state for members array
    const [todaysDinner, setTodaysDinner] = useState<IHostedDinners | null>(null); // Initialize state for members array
    const [memberNames, setMemberNames] = useState([])
    const [myReviews, setMyreviews] = useState([])
    const [hasUserReviewed, sethasUserReviewed] = useState(false)
    const [isUserTheCook, setisUserTheCook] = useState(false)

    useEffect(() => {
        // Call the getMembers function when the component mounts
        const fetchMembers = async () => {
            try {
                const membersArray = await getMembers();
                if (user && user.email) {
                    const matchingMember = membersArray.find(member => member.email === user.email);
                    if (matchingMember) {
                        setUserName(matchingMember.name)
                    }
                    try {
                        let reviews = await getMyReviews(matchingMember.name);
                        if (reviews) setMyreviews(reviews)
                    } catch (error) {
                        alert('Sorry, there was an error fetching your previous reviews' + error)
                    }
                } 

                setMembers(membersArray); // Set state with the returned array
                const names = membersArray.map((member) => member.name);
                // console.log("member names, need to filter out guests unless it is their day", membersArray)
                setMemberNames(names); // Set state with member names

                if (user != undefined) {
                    
                }

                // const nextDinner = await getNextDinner();
                const nextDinner = await getTodaysDinner();
                if (nextDinner) {
                    console.log(nextDinner)
                    setTodaysDinner(nextDinner)
                    inputFields.season = nextDinner.season
                    inputFields.weekNumber = nextDinner.weekNumber

                    

                    const mysteryQ = await getMysteryQ(nextDinner.season, nextDinner.weekNumber);
                    if (mysteryQ) {
                        setInputFieldData(prevState => ({
                            ...prevState,
                            mysteryQ: mysteryQ.mysteryQuestion,
                            mysteryQuestionType: mysteryQ.mysteryQuestionType
                        }));
                    }
                }
               
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, [user]);

    const handleDropdownSelection = (field, data) => {
        setInputFieldData(prevState => ({
            ...prevState,
            [field]: data
        }));
    }

    const checkUserReviewed = () => {
        if (todaysDinner) {
            const foundReview = myReviews.find(review => review.weekNumber === todaysDinner.weekNumber && review.season === todaysDinner.season)
            if (foundReview) {
                sethasUserReviewed(true)
                return
            } 
            else sethasUserReviewed(false)
        } else {
            // console.log('todaysDinner', todaysDinner)
        }
        sethasUserReviewed(false)
    }

    const checkIsUserCook = () => {
        if (todaysDinner) {
            if (todaysDinner.hostName == userName) {
                setisUserTheCook(true)
                return
            } else setisUserTheCook(false)
        }
        setisUserTheCook(false)
    }

    const handleChildData = (field, data) => {
        setInputFieldData(prevState => ({
            ...prevState,
            [field]: data
        }));
    }

    const submitReview = () => {
        try {
            addReview(inputFields)

        } catch (error) {
            alert('Failed to submit this review' + error)
        } finally {
            alert('Submitted this review successfully')
            sethasUserReviewed(true);
            setInputFieldData({
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
                mysteryRating: -1,
                weekNumber: 0,
                season: 0
            })
        }
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    
    const signOutOfApp = () => {
        try {
            FIREBASE_AUTH.signOut()
            console.log("Trying to sign out")
        } catch (error) {
            console.log("Failed to sign out : ", error)
            alert('error signout out' + error)
        } finally {
            console.log("Should have successfully signed out")
        }
    }
    

    // Check if all input fields are filled
    useEffect(() => {
        // inputFields.reviewer !== '' && inputFields.cook !== '' &&
        if (!inputFields.mysteryQ) {
            if (inputFields.entreeRating !== 0 && inputFields.mainRating !== 0 && inputFields.dessertRating !== 0 && inputFields.entertainmentRating !== 0) {
                setAllFieldsFilled(true);
            } else {
                setAllFieldsFilled(false);
            }
        } else {
            if (inputFields.entreeRating !== 0 && inputFields.mainRating !== 0 && inputFields.dessertRating !== 0 && inputFields.entertainmentRating !== 0 && (inputFields.mysteryAnswer != '' || inputFields.mysteryRating != -1)) {
                setAllFieldsFilled(true);
            } else {
                setAllFieldsFilled(false);
            }
        }
        
    }, [inputFields]);

    useEffect(() => {
        checkUserReviewed();
        checkIsUserCook();
        
    }, [todaysDinner, myReviews]);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <GestureHandlerRootView style={{ flex: 1 }}>
                

                    <View style={[styles.container, {
                        paddingTop: 15,
                    }]}>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust the offset as needed
                        >
                            <ScrollView
                                contentContainerStyle={{ paddingBottom: insets.bottom + 120, flexGrow: 1 }}
                                style={styles.scrollContainer}
                                showsVerticalScrollIndicator={false}
                                bounces={true}
                                keyboardShouldPersistTaps='always'
                                keyboardDismissMode='interactive'>
                                <Animated.View
                                    entering={FadeIn.duration(500).easing(Easing.out(Easing.ease))}
                                    exiting={FadeOut.duration(500).easing(Easing.in(Easing.ease))}
                                    layout={Layout.springify()}
                                >
                                    {user !== null ? (

                                        <View>
                                            <View style={styles.header}>
                                                <View style={{ width: '30%' }}>
                                                {/* <Button title="sign out" onPress={signOutOfApp}/> */}

                                                </View>
                                                <Text style={styles.headerTitle}>It's Review Time!</Text>
                                                <TouchableOpacity onPress={handleOpenPress} style={[styles.buttonContainer]}>
                                                    <Text style={styles.buttonText}>Previous</Text>
                                                </TouchableOpacity>
                                            </View>


                                            {todaysDinner != null && !hasUserReviewed && !isUserTheCook ? ( <View>
                                                <View style={styles.dropdownContainer}>
                                                    {userName != null ? (<View style={styles.dropdownContainer}>
                                                        {userName.length > 0 && <SelectList
                                                            setSelected={(val) => handleDropdownSelection("reviewer", val)}
                                                            data={[userName]}
                                                            save="value"
                                                            placeholder="Eater"
                                                            boxStyles={{ width: '50%', alignItems: 'center' }}
                                                            search={false}
                                                        />}
                                                    </View>
                                                    )
                                                        : (
                                                            <View style={styles.dropdownContainer}>
                                                                {memberNames.length > 0 && <SelectList
                                                                    setSelected={(val) => handleDropdownSelection("reviewer", val)}
                                                                    data={memberNames}
                                                                    save="value"
                                                                    placeholder="Eater"
                                                                    boxStyles={{ width: '50%', alignItems: 'center' }}
                                                                    search={false}
                                                                />}
                                                            </View>)}

                                                    {inputFields.reviewer !== '' && <SelectList
                                                        setSelected={(val) => handleDropdownSelection("cook", val)}
                                                        data={[todaysDinner.hostName]}
                                                        save="value"
                                                        placeholder="Cook"
                                                        boxStyles={{ width: '50%' }}
                                                        search={false}
                                                    />}
                                                </View>
                                            <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
                                                <View>
                                                    {inputFields.cook !== '' && <InputNumberField field="entreeRating" onEmit={handleChildData} />}
                                                    {inputFields.entreeRating != 0 && <InputNumberField field="mainRating" onEmit={handleChildData} />}
                                                    {inputFields.mainRating != 0 && <InputNumberField field="dessertRating" onEmit={handleChildData} />}
                                                    {inputFields.dessertRating != 0 && <InputNumberField field="entertainmentRating" onEmit={handleChildData} />}

                                                    {inputFields.entertainmentRating != 0 && <InputTextField field="writtenReview" onEmit={handleChildData} />}

                                                    {inputFields.writtenReview != '' && inputFields.mysteryQ && inputFields.mysteryQuestionType == 'written' &&
                                                        <InputTextField field="mysteryAnswer" mysteryQuestion={inputFields.mysteryQ} onEmit={handleChildData} />}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            </View> )
                                            : (
                                                <View style={styles.noDinnerView}>
                                                    {(todaysDinner == null) ? (
                                                        <Text style={styles.noDinnerText}>There is no scheduled dinner today!</Text>
                                                    ) : (
                                                        <View>
                                                            {!hasUserReviewed && !isUserTheCook && <Text style={styles.noDinnerText}>You have already reviewed today or you are the cook</Text>}
                                                            {isUserTheCook && <Text style={styles.noDinnerText}>You're the cook you cheeky bitch</Text>}

                                                        </View>
                                                    )}
                                                    
                                                </View>
                                            ) }
                                        
                                            {allFieldsFilled == true && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 16, paddingBottom: 200 }}>
                                                <TouchableOpacity style={styles.button} onPress={submitReview}>
                                                    <Text style={styles.button}>Submit</Text>
                                                </TouchableOpacity>
                                            </View>}
                                        </View>
                                    ) :
                                        (
                                            <Login />
                                        )}

                                </Animated.View>

                            </ScrollView>
                        </KeyboardAvoidingView>


                    </View>
                


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
                        {/* <PreviousReviews userProp={user.email}/> */}
                        {user && user.email ? (
                            <PreviousReviews userProp={userName} />
                        ) : (
                            <PreviousReviews />
                        )}
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
        paddingBottom: 80,
        height: '100%'
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
        marginBottom: 16,
        // marginTop: 16,
        // height: 60

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
    noDinnerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    noDinnerText: {
        fontSize: 24,
        fontWeight: 900,
        color: 'gray'

    }

});
