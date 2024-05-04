import { Link } from "expo-router";
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from "react-native";
import FoodLogListItem from "../components/FoodLogListItem";
import { gql, useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import InputNumberField from '../components/InputNumberField'
import  IReviewInput  from '../interfaces/IReviewInput'
import { SelectList } from 'react-native-dropdown-select-list'


const query = gql`
    query foodLogsForDate($date :Date!, $user_id:String!){
    food_logByUser_idAndDate(date: $date, user_id: $user_id){
        created_at
        food_id
        id
        kcal
        label
    }
    }
`
const totalKcalQuery = gql`
    query totalKcal_dailyQuery ($date :Date!, $user_id: String!) {
        KcalTotalForDate(date: $date, username: $user_id) {
            total_kcal
        }
    }
`

export default function HomeScreen() {

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
  
    const data = [
        {key:'1', value:'Tyler Best', disabled:true},
        {key:'2', value:'Liam Miller'},
        {key:'3', value:'Stuart Higham'},
        {key:'4', value:'Liam Mcleod', disabled:true},
        {key:'5', value:'Liam Frank'},
        {key:'6', value:'Lochie Martin'},
        {key:'7', value:'Matt Percival'},
    ]

    const handleChildData = (field, data) => {
        setInputFieldData(prevState => ({
            ...prevState,
            [field]: data
        }));
    }

    const logInputs = () => {
        console.log("inputs: ", inputFields)
    }
    return (
        <View style={[styles.container, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dinner Review App</Text>
            </View>

            <View style={styles.dropdownContainer}>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    placeholder="Cook"
                    boxStyles={{ width: '50%' }}
                    search={false}
                />
            </View>

            <InputNumberField field="entreeRating" onEmit={handleChildData} />
            <InputNumberField field="mainRating" onEmit={handleChildData} />
            <InputNumberField field="dessertRating" onEmit={handleChildData} />
            <InputNumberField field="entertainmentRating" onEmit={handleChildData} />

            <Button title="Log inputs"
                onPress={logInputs} />

            {/* {foodLogData && <FlatList
                data={foodLogData.food_logByUser_idAndDate}
                contentContainerStyle={{ gap: 5 }}
                renderItem={({ item }) => <FoodLogListItem item={item} />}
            />} */}
        </View>
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
        fontWeight: '900',
        color: "black",
        paddingVertical: 20,
        
    },
    dropdownContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',

    }
});
