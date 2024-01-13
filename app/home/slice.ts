import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserChat } from './chat'

const initialState : {
	chats: UserChat[]
} = {
  chats: []
}

export const chatsListSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
		addChats(state, action: PayloadAction<UserChat>){
			state.chats.push(action.payload);
		}
  },
})

// Action creators are generated for each case reducer function
export const { addChats } = chatsListSlice.actions

export default chatsListSlice.reducer