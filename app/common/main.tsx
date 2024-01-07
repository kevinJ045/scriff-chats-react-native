import { StyleSheet, View } from "react-native";
import { InitViews } from "./init";
import { StatusBar } from "expo-status-bar";
import { withTheme } from "react-native-paper";
import { Theme } from "./theme";
import { LoggerUI } from "../logger/ui";

const styles = StyleSheet.create({
  container: {
  },
});

export const MainApp = withTheme(function MainApp({ theme } : { theme: Theme } ){
	return (
		<View style={{...styles.container, backgroundColor: theme.colors.background}}>
			<LoggerUI></LoggerUI>
			<InitViews></InitViews>
			<StatusBar style="light" translucent />
		</View>
	)
});