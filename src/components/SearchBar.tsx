import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = () => {
	return (
		<TextInput placeholder="Search..." style={style.input} />
	)
}

const style = StyleSheet.create({
    input: {
        backgroundColor: '#F2f2f2',
        padding: 10,
        borderRadius: 16,


    }
})

export default SearchBar