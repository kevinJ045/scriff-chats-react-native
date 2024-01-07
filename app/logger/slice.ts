import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  text: ''
}

export const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    loggerLog: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { loggerLog } = loggerSlice.actions

export default loggerSlice.reducer