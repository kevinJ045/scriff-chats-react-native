import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Message } from './message'

const initialState : {
	chatboxes: Record<string, Message[]>,
	currentChatBox: string | null
} = {
  chatboxes: {},
	currentChatBox: null
}

export const chatBoxesListSlice = createSlice({
  name: 'chatbox',
  initialState,
  reducers: {
		addChatBox(state, action: PayloadAction<{username: string, chats: Message[]}>){
			if(!state.chatboxes[action.payload.username]) state.chatboxes[action.payload.username] = [];
			state.chatboxes[action.payload.username].push(...action.payload.chats);
		},
		setChatBox(state, action: PayloadAction<string | null>){
			state.currentChatBox = action.payload;
		}
  },
})

// Action creators are generated for each case reducer function
export const { addChatBox } = chatBoxesListSlice.actions
export const { setChatBox } = chatBoxesListSlice.actions

export default chatBoxesListSlice.reducer