import { User } from "./user"

export type Message = {
	time?: string;
	content?: string;
}

export type UserChatLike = {
	user?: User;
	lastMessage?: Message;
}

export class UserChat {
	user: User = new User();
	lastMessage: Message = {};

	constructor(chatlike: UserChatLike = {}){
		if(chatlike){
			if(chatlike.lastMessage) this.lastMessage = chatlike.lastMessage;
			if(chatlike.user) this.user = chatlike.user;

			// @ts-ignore
			if(this.lastMessage.length) this.lastMessage = this.lastMessage[0];
		}
	}
}