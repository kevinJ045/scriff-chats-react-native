import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%'
	}
})

export function HomePage(){

	

	return <View style={styles.container}>
		<List.Section title="Accordions">
			<List.Item
				title="First Item"
				description="Item description"
				left={props => <List.Icon {...props} icon="folder" />}
			/>
		</List.Section>
	</View>;
}