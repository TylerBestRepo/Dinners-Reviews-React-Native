import { View, Text, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';

const FoodLogListItem = ({ item }) => {
	return (
		<View style={styles.container}>
			<View style={{ flex: 1, gap: 5 }}>
				<Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
				<Text style={{}}>{item.kcal} cal</Text>
			</View>
			<AntDesign name="pluscircleo" size={30} color="royalblue" />
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

export default FoodLogListItem