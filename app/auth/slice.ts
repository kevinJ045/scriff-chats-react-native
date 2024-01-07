import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { whoamiURL } from '../common/url';
import { login } from './auth';
import LocalDB from '../localdb/localdb';
import { Logger } from '../logger/logger';

// Define initial state
const initialState = {
  logged_in: false,
	token: "",
	username: "",
	password: ""
};

type loginOptions = {
	username: string,
	password: string,
	token: string,
	save: boolean
}

// Create a counter slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state: any, action: PayloadAction<loginOptions>) => {
			const { username, password, token, save } 
			: loginOptions = action.payload;

			state.username = username;
			state.password = password;
			state.token = token;

			state.logged_in = true;

			if(save){
				LocalDB.set('login.username', username);
				LocalDB.set('login.password', password);
				LocalDB.set('login.token', state.token);
			}

    }
  },
});

// Export actions
export const { authLogin } = authSlice.actions;

export default authSlice.reducer;
