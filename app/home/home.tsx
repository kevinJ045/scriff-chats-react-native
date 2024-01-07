import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Avatar, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { allChatsNamesURL, avatarUrl, lastMessageWithUserURL, userProfileURL } from "../common/url";
import { getFrom } from "../common/req";
import { User } from "./user";
import { UserChat } from "./chat";
import { addChats } from "./slice";
import LocalDB from "../localdb/localdb";

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%'
	}
})

export function HomePage(){

	const chats = useSelector((state: RootState) => state.chats.chats);
	const token = useSelector((state: RootState) => state.auth.token);

	const dispatch = useDispatch();

	if(!chats.length){
		fetch(allChatsNamesURL, { headers: { token } })
		.then(r => r.json())
		.then(async names => {
			for(let name of names){
				const user = await getFrom(userProfileURL(name), token);
				let lastMessage = await getFrom(lastMessageWithUserURL(name), token);

				if(lastMessage[0]) lastMessage = lastMessage[0];
				
				dispatch(addChats(new UserChat({
					user: {
						name: user.name,
						username: user.username
					},
					lastMessage: {
						time: lastMessage.time,
						content: lastMessage.content
					}
				})));
			}
		})
	}

	return <View style={styles.container}>
		<List.Section title="Messages" style={{padding: 10}}>
			{
				chats.length ? chats.map(chat => <List.Item
					title={chat.user?.name}
					description={chat.lastMessage?.content!}
					left={props => <Avatar.Image size={48} source={{ uri: avatarUrl(chat.user.username) }} />}
					key={chat.user.username}
				/>) : <ActivityIndicator />
			}
		</List.Section>
	</View>;
}