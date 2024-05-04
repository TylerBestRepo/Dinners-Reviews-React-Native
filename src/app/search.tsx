import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, ActivityIndicator } from 'react-native';
import FoodListItem from '../components/FoodListItem';
import { SearchBar } from 'react-native-screens';
import { useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { Ionicons } from "@expo/vector-icons"

import { Camera, CameraType } from 'expo-camera'





export default function SearchScreen() {
	const [search, setSearch] = useState('')
	// const [runSearch, { data, loading, error }] = useLazyQuery(query)
	const [scannerEnabled, setScannerEnabled] = useState(false)

	// const [permission, requestPermission] = Camera.useCameraPermissions();


	// requestPermission();


	// if (error) {
	// 	return <Text>Failed to search</Text>
	// }

	// if (scannerEnabled) {
	// 	return (
	// 		<View>
	// 			<Camera style={{width: "100%", height: "100%"}} onBarCodeScanned={(data) => {
	// 				runSearch({ variables: { upc: data.data } });
	// 				setScannerEnabled(false);
					
	// 				}}/>
	// 			<Ionicons onPress={() => setScannerEnabled(false)} name="close" size={30} color="dimgray" style={{ position: 'absolute', right: 10, top: 10 }} />
	// 		</View>
	// 	)
	// }

	// const performSearch = () => {
	// 	runSearch({ variables: { ingr: search } });
	// }

	// const items = data?.search?.hints || [];

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: 'center', gap: 10 }}>
				<TextInput value={search} onChangeText={setSearch}
					placeholder="Search..." style={styles.input} />
				{/* {search && <Button title='search' onPress={performSearch} />} */}
				{/* {loading && <ActivityIndicator />} */}
				<Ionicons onPress={() => setScannerEnabled(true)} name="barcode-outline" size={32} color="dimgray" />
			</View>

			{/* <FlatList
				data={items}
				renderItem={({ item }) => <FoodListItem item={item} />}
				contentContainerStyle={{ gap: 10, }}
				ListEmptyComponent={() => <Text>Search a food item</Text>}
			/> */}

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
		padding: 10,
		gap: 10
	},
	input: {
		backgroundColor: '#F2f2f2',
		padding: 10,
		borderRadius: 16,
		flex: 1


	}
});
