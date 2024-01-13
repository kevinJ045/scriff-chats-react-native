import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Appbar, Avatar, Button, List, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getFrom } from "../common/req";
import { addChatBox, setChatBox } from "./slice";
import { avatarUrl, baseURL, userProfileURL } from "../common/url";
import { User } from "../home/user";
import { useEffect, useRef, useState } from "react";
import { Message } from "./message";
import { socketConnect } from "../common/socket";

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	containerCenteredElements: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bottom: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
  },
  textInput: {
    width: '85%',
		backgroundColor: 'transparent'
  },
	messageItem: {
    padding: 8
  }
});

const loadMessages = async  (username: string, messagesIndex: number, messagesLimit: number, token: string) => {
	var a = await getFrom(baseURL+'/chats/all/messages/'+username+'/page/'+messagesIndex+'/'+messagesLimit, token);
	return a;
};

export function ChatBoxPage({username}: { username: string }){

	const currentChatBoxMessages = useSelector((state: RootState) => state.chatbox.chatboxes);
	const dispatch = useDispatch();

	const token = useSelector((state: RootState) => state.auth.token);
	const me = useSelector((state: RootState) => state.auth.username);

	const [user, setUser] = useState(new User());
	const [loaded, setLoaded] = useState(false);

	const [listening, setListening] = useState(false);

	const socket = socketConnect(token);

	useEffect(() => {
    if (!loaded) {
      getFrom(userProfileURL(username), token)
        .then(async (user) => {
          setUser(User.from(user));

          const loadedMessages = await loadMessages(
            username,
            (currentChatBoxMessages[username] || []).length,
            20,
						token
          );

          dispatch(addChatBox({ username, chats: loadedMessages }));
          setLoaded(true);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }

		if(!listening){
			socket.off('chat:new');
			socket.on('chat:new', (msg: Message) => {
				if(msg.username !== username || msg.recipient !== me) return;
				if(currentChatBoxMessages[username]?.find(m => m.id == msg.id)) return;

				dispatch(addChatBox({ username, chats: [msg] }));
			});
			setListening(true);
		}
  }, [listening, loaded, username, token, currentChatBoxMessages]);

	const [message, setMessage] = useState('');

	const handleSend = () => {
		let m = message;
		if(m.trim() == '') return;
		setMessage('');
		socket.emit('chat:new', {
			content: m,
			recipient: username
		});
	}

	const flatListRef = useRef(null);
	const scrollToBottom = () => {
    (flatListRef.current as (FlatList | null))?.scrollToOffset({ offset: 0, animated: true });
  };

	return <View style={loaded ? styles.container : styles.containerCenteredElements}>
		{
			loaded ? <>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => dispatch(setChatBox(null))} />
					<Avatar.Image
              size={40}
              source={{ uri: avatarUrl(username) }}
              style={{ marginRight: 8 }}
            />
					<Appbar.Content title={user.name} />
					<Appbar.Action icon="magnify" onPress={() => {}} />
					<Appbar.Action icon="dots-vertical" onPress={() => {}} />
				</Appbar.Header>

				<FlatList
					ref={flatListRef}
					data={(currentChatBoxMessages[username] || [])}
					keyExtractor={(item, index) => item.id.toString()+index}
					onContentSizeChange={scrollToBottom}
        	onLayout={scrollToBottom}
					renderItem={({ item }) => (
						<View style={styles.messageItem}>
							<Text>{item.content}</Text>
						</View>
					)}
				/>

				<Appbar style={styles.bottom}>
					<TextInput
						style={styles.textInput}
						placeholder="Type your message..."
						value={message}
						onChangeText={(text) => setMessage(text)}
						activeOutlineColor="transparent"
						outlineColor="transparent"
						multiline
					/>
					<Appbar.Action icon="send" onPress={handleSend} />
				</Appbar>
			</> : <ActivityIndicator size={36} />
		}
	</View>;
}