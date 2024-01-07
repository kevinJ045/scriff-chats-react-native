import { Text, View } from "react-native";
import LocalDB from "../localdb/localdb";
import { HomePage } from "../home/home";
import { LoginPage } from "../auth/login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { authLogin } from "../auth/slice";
import { ActivityIndicator } from "react-native-paper";
import { Logger } from "../logger/logger";
import { whoamiURL } from "./url";
import { login } from "../auth/auth";




export function InitViews(){

	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const loggedIn = useSelector((state: RootState) => state.auth.logged_in);

	LocalDB.get('login.token').then(async (token) => {
		if(token){
			const username = await LocalDB.get('login.username') as string;
			const password = await LocalDB.get('login.password') as string;

			Logger.log('Login record found, verifying as user "', username, '"');

			const done = () => dispatch(authLogin({
				username,
				password,
				token,
				save: true
			})) && (setLoading(false),new Promise((r) => {Logger.log(''), r(null)}).catch(e => null));

			fetch(whoamiURL, {
				headers: {
					token
				}
			})
			.then(r => r.text())
			.then((musername: string) => {
				if(musername == '401'){
					Logger.log('Session terminated... logging in again');
					login(username, password, (data) => (token = data.token) && done());
				} else {
					Logger.log('Session active... Continue launch');
					done();
				}
			})
			.catch(e => null);
		} else {
			setLoading(false);
			Logger.log('Not logged in, Opening the login page...');
		}
		
	});

	setTimeout(() => Logger.log('Loading account...'), 1);

	return <View>
		{
			loading ? (<ActivityIndicator />) : (loggedIn ? <HomePage /> : <LoginPage />)
		}
	</View>
}