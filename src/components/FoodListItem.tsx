import { View, Text, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';

import { useRouter } from "expo-router";

const mutation = gql`
	mutation MyMutation ($food_id:String!, $cal: Int!,$label:String!, $user_id:String!) {
		insertFood_log(food_id: $food_id, kcal: $cal, label: $label, user_id: $user_id) {
			created_at
			food_id
			id
			kcal
			label
			user_id
	}
}
`

const FoodListItem = ({ item }) => {

	const [logFood, {data, loading, error}] = useMutation(mutation, {
		refetchQueries: ['foodLogsForDate'],
	})
	const router = useRouter()

	const onPlusPressed = async() => {
		await logFood({variables: {
			"food_id": item.food.foodId, 
			"cal": item.food.nutrients.ENERC_KCAL, 
			"label": item.food.label, 
			"user_id": "Tyler"
		}})

		router.back();
	}
	return (
		<View style={styles.container}>
			<View style={{ flex: 1, gap: 5 }}>
				<Text style={{ fontWeight: 'bold' }}>{item.food.label}</Text>
				<Text style={{}}>{item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}</Text>
			</View>
			<AntDesign name="pluscircleo" size={30} color="royalblue" onPress={onPlusPressed}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f6f6f8',
		padding: 10,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
})

export default FoodListItem