import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, Easing, ImageStyle, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Redirect, router } from "expo-router";
import { Audio } from 'expo-av'; // Import Audio from Expo AV for sound playback
import { getMembers, getDinners } from "../../api/gets";

import { tinoImg, tinoMoan, stuImg, frankImg, tylerImg, mushImg, mattImg, mcnibbImg, defaultImg } from '../../assets';
import { IHostedDinners } from '../../interfaces';
import React, { useRef, useState, useEffect } from 'react'

import InputTextField from '../../components/InputTextField';
import axios from 'axios';


const index = () => {
    const insets = useSafeAreaInsets();
    const animation = useRef(new Animated.Value(0)).current;

    const playSound = async () => {
        try {
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync(tinoMoan);
            await soundObject.playAsync();

            // Start animation
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: -1,
                        duration: 600,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start();
        } catch (error) {
            console.error('Error playing sound: ', error);
        }
    };

    const interpolatedTransformAnimation = animation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [1.1, 1, 1.5],
    });

    const interpolatedRotateAnimation = animation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-40deg', '40deg'],
    });

    const animatedStyle: Animated.WithAnimatedObject<ImageStyle> = {
        transform: [
            { scale: interpolatedTransformAnimation },
            { rotate: interpolatedRotateAnimation },
        ],
    };

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleChildDataTitle = (field, data) => {
        setTitle(prevState => (data));
    }
    const handleChildDataBody = (field, data) => {
        setBody(prevState => (data));
    }

    const sendNotif = async () => {
        const url = 'https://app.nativenotify.com/api/notification';

        console.log("Would be sending the notification here")

        const notificationData = {
            appId: 21206,
            appToken: "FhEKCTFXyidkxbixUvCS9w",
            dateSent: new Date().toLocaleString(),
            title: title,
            body: body,
        };

        try {
            const response = await axios.post(url, notificationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    }


    const [dinners, setDinners] = useState<IHostedDinners[]>([]); // Initialize state for members array
    useEffect(() => {
        // Call the getMembers function when the component mounts
        const fetchDinners = async () => {
            try {
                const membersArray = await getDinners();
                setDinners(membersArray); // Set state with the returned array
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchDinners();
    }, []);

    const getHostImage = (hostName) => {
        switch (hostName) {
            case "Stuart Higham":
                return stuImg;
            case "Lochie Martin":
                return tinoImg;
            case "Liam Miller":
                return mushImg;
            case "Liam Frank":
                return frankImg;
            case "Liam Mcleod":
                return mcnibbImg;
            case "matt Percival":
                return mattImg;
            case "Tyler Best":
                return tylerImg;
            // Add more cases for each hostName and their respective images
            default:
                return defaultImg; // A default image if hostName doesn't match any case
        }
    };

    const renderDinners = () => {
        return dinners.map((dinner) => (
            <View key={dinner.id} style={styles.card}>
                {/* Render dinner information here */}
                <View style={styles.topContainer}>
                    <Text style={styles.topText}>
                        Season: {dinner.season}, Week {dinner.weekNumber}
                    </Text>
                </View>

                <View style={styles.middleContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boldText, styles.middleText]}>Host: </Text>
                        <Text style={styles.middleText}>{dinner.hostName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boldText, styles.middleText]}>Date: </Text>
                        <Text style={styles.middleText}>{dinner.date.toLocaleDateString()}</Text>
                    </View>
                </View>
                <Image borderRadius={6}
                    source={getHostImage(dinner.hostName)}
                    resizeMode='cover'
                    //  style={{ height: 200, width: 150, borderRadius: 16 }}
                    style={styles.imageSmall}
                />
            </View>
        ));
    };

    return (
        <View style={[styles.container, {
            paddingTop: 15,
            // paddingTop: insets.top + 30,
            // paddingBottom: insets.bottom,
        }]}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>

                {/* <Text style={styles.header}>Dinner Reviews</Text> */}

                {/* <View style={styles.imageAndOther}>
                    <TouchableOpacity onPress={playSound}>
                        <Animated.Image borderRadius={6}
                            source={tinoImg}
                            resizeMode='cover'
                            //  style={{ height: 200, width: 150, borderRadius: 16 }}
                            style={[styles.image, animatedStyle]}
                        />
                    </TouchableOpacity>
                </View> */}
                <View>
                    <Text style={styles.header}>
                        Temporary API notification testing. Might need to look into expo push notifications
                    </Text>
                    <InputTextField field="Notification Title" onEmit={handleChildDataTitle} />
                    <InputTextField field="Notification sub message" onEmit={handleChildDataBody} />

                    <TouchableOpacity style={styles.button} onPress={sendNotif}>
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.upcomingContainer}>
                    <View style={styles.upcoming}>
                        <Text style={styles.header}>Upcoming:</Text>
                    </View>
                    <View style={styles.cardsContainer}>{renderDinners()}</View>
                </View>
            </ScrollView>


        </View>
    )
}

export default index
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // Align items and justify content for spacing
        // marginTop: 20
    },

    header: {
        marginTop: 12,
        fontSize: 38,
        fontWeight: "600",
    },
    upcoming: {
        width: '65%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    imageAndOther: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'

    },
    upcomingContainer: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 16,
        resizeMode: 'cover',
    },
    imageSmall: {
        width: 60,
        height: 75,
        borderRadius: 34,
        resizeMode: 'cover',
    },
    cardsContainer: {
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        width: 250,
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 10,
        elevation: 4, // For Android elevation
        shadowColor: '#000000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.25, // For iOS shadow
        shadowRadius: 3.84, // For iOS shadow
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // gap: 10,
        padding: 10
    },
    scrollContainer: {
        flex: 1,
        width: '100%'
    },
    topContainer: {
        marginTop: 10,
        marginBottom: 10,

        alignItems: 'center',
    },
    middleContainer: {
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
    },
    topText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#5C6EB5'
    },
    middleText: {
        fontSize: 16
    },
    boldText: {
        fontWeight: 'bold',
    },
    button: {
        fontSize: 20,
        color: 'black',
        backgroundColor: '#ADD8E6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
})