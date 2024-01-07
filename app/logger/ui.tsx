import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StyleSheet } from "react-native";
import { Logger } from "./logger";
import { loggerLog } from "./slice";

const styles = StyleSheet.create({
	logger: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		textAlign: 'center'
	}
})


export function LoggerUI(){

	const loggerText = useSelector((state: RootState) => state.logger.text);
	
	const dispatch = useDispatch();

	if(!Logger.set) (Logger.dispatch = (text: string) => {
		try{
			dispatch(loggerLog(text));
		} catch(e){
			console.log(text);
		}
	}) && (Logger.set = true); 

	return <Text style={{
		...styles.logger,
		height: loggerText.length ? 40 : 0
	}}>{loggerText}</Text>;
}