import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        mail: '',
        pass: '',
        permission: '',
    },
    reducers: {
        setAccountData: (state, action) => {
            state.mail = action.payload.mail
            state.pass = action.payload.pass
            state.permission = action.payload.permission
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAccountData } = accountSlice.actions

export default accountSlice.reducer
