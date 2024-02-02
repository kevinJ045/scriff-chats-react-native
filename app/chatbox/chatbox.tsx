import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Appbar, Avatar, Button, List, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getFrom } from "../common/req";
import { addChatBox, setChatBox } from "./slice";
import { avatarUrl, baseURL, userProfileURL } from "../common/url";
import { User } from "../home/user";
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "./message";
import { socketConnect } from "../common/socket";
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

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


	const handleSend = (message: string) => {
		let m = message;
		if(m.trim() == '') return;
		socket.emit('chat:new', {
			content: m,
			recipient: username
		});
	}

	const onSend = useCallback((messages: IMessage[] = []) => {
		// handleSend();
		console.log(messages);
		messages.forEach((message) => {
			handleSend(message.text);
		});
		// dispatch(addChatBox({
		// 	username: user.username,
		// 	chats: []
		// }))
    // GiftedChat.append(messages.slice(0, messages.length-2), messages);
  }, [])

	const flatListRef = useRef(null);
	const scrollToBottom = () => {
    (flatListRef.current as (FlatList | null))?.scrollToOffset({ offset: 0, animated: true });
  };

	const getUserIndex = (username: string) => {
		let index = Object.keys(currentChatBoxMessages).indexOf(user.username);
		if(index < 0) index = Object.keys(currentChatBoxMessages).length*2 || 2;
		return index+2;
	}

	function removeDuplicates(arr: any[], key: string) {
		return arr.filter((item, index, self) =>
			index === self.findIndex((t) => t[key] === item[key])
		);
	}

	const convertMessages = (messages: Message[]) => removeDuplicates(messages.map(item => ({
		_id: item.id,
		text: item.content,
		createdAt: new Date(item.time),
		user: {
			_id: item.username,
			name: item.username == me ? me : user.name,
			avatar: avatarUrl(item.username)
		}
	})), '_id').reverse();

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

				<GiftedChat
					messages={convertMessages(currentChatBoxMessages[user.username])}
					onSend={messages => onSend(messages)}
					user={{
						_id: me
					}}
				/>

			</> : <ActivityIndicator size={36} />
		}
	</View>;
}