import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { IReviews } from '../../interfaces';
import { getMyReviews } from '../../api/gets';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from "react-native-gifted-charts";
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';



const previousReviews = ({ userProp = "No email provided" }) => {
    // API gets for previous reviews and show them here

    const [reviews, setReviews] = useState<IReviews[]>([]); // Initialize state for members array
    const [dropdownStates, setDropdownStates] = useState(reviews.map(() => false)); // State for dropdown visibility, one state per review
    const [dropdownHeights, setDropdownHeights] = useState(reviews.map(() => new Animated.Value(0)));

    const toggleDropdown = (index) => {
        setDropdownStates((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });

        // Animate the dropdown height
        const newDropdownHeight = dropdownStates[index] ? 0 : 100; // Adjust the height accordingly
        Animated.timing(dropdownHeights[index], {
            toValue: newDropdownHeight,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };


    let data = [{
        label: 'Entree', frontColor: 'red',
        value: 1
    },
    {
        label: 'Main', frontColor: 'red',
        value: 4
    },
    {
        label: 'Dessert', frontColor: 'red',
        value: 4
    },
    {
        label: 'Entertainment', frontColor: '#177AD5',
        value: 8
    }
    ]

    let dataItem = []

    const barData = [
        { value: 250, label: 'M' },
        { value: 500, label: 'T', frontColor: '#177AD5' },
        { value: 745, label: 'W', frontColor: '#177AD5' },
        { value: 320, label: 'T' },
        { value: 600, label: 'F', frontColor: '#177AD5' },
        { value: 256, label: 'S' },
        { value: 300, label: 'S' },
    ];

    useEffect(() => {
        const fetchDinners = async () => {
            try {
                const reviewsArray = await getMyReviews('Tyler Best');
                setReviews(reviewsArray); // Set state with the returned array

                // Initialize dropdownHeights after reviews have been fetched
                setDropdownHeights(reviewsArray.map(() => new Animated.Value(0)));
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchDinners();
    }, []);


    useEffect(() => {
        reviews.forEach(review => {
            // Iterate over each chartInfo item in the review
            review.chartInfo.forEach(item => {
                // Check the value and update the frontColor accordingly
                if (item.value >= 8) {
                    item.frontColor = '#8AE597'; // Light green
                } else if (item.value > 5 && item.value < 8) {
                    item.frontColor = '#FFE88A'; // Pale yellow
                } else if (item.value > 3 && item.value < 5) {
                    item.frontColor = '#FFB06A'; // Peach
                } else {
                    item.frontColor = '#FF8882'; // Soft coral
                }
            });
        });
    }, [reviews]);


    const renderReviews = () => {
        return reviews.map((review, index) => (
            <View key={review.id} style={styles.card}>
                {/* Render dinner information here */}
                <View style={styles.topContainer}>
                    <Text style={styles.topText}>
                        Season: {review.season}, Week {review.weekNumber}
                    </Text>
                    {userProp && <Text> User email passed in = {userProp} </Text>}
                </View>

                <View style={styles.middleContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.boldText, styles.middleText]}>Host: {review.cook} </Text>
                        <TouchableOpacity onPress={() => toggleDropdown(index)}
                            style={{ padding: 8, paddingBottom: 12 }}>
                            <AntDesign name="down" size={12}color={dropdownStates[index] ? 'blue' : 'black'} // Change color when activated
/>
                        </TouchableOpacity>

                    </View>
                    {dropdownStates[index] && (
                        <Animated.View style={[styles.dropdownContent, { height: dropdownHeights[index] }]}>
                            <Text>{review.writtenReview}</Text>
                        </Animated.View>
                    )}
                </View>
                <View style={styles.chartContainer}>
                    {<BarChart
                        barWidth={50}
                        noOfSections={10}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data={review.chartInfo}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        initialSpacing={10}

                    />}
                </View>

            </View>
        ));
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View>
                {reviews.length > 0 && <View style={styles.cardsContainer}>{renderReviews()}</View>}

            </View>
        </ScrollView>

    )
}

previousReviews.propTypes = {
    userProp: PropTypes.string,
};

export default previousReviews

const styles = StyleSheet.create({
    cardsContainer: {
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        width: 350,
        flex: 1,
        // height: 350,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 10,
        elevation: 4, // For Android elevation
        shadowColor: '#000000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.25, // For iOS shadow
        shadowRadius: 3.84, // For iOS shadow
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
        fontSize: 16,
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingLeft: 16,
        marginTop: 16,
        width: '100%'
    },
    dropdownContent: {
        width: '85%',
    }

})