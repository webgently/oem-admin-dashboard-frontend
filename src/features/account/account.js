import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
   name: 'account',
   initialState: {
      _id: '',
      address: '',
      checkflag: '',
      city: '',
      country: '',
      credit: '',
      date: '',
      email: '',
      name: '',
      note: '',
      password: '',
      permission: '',
      phone: '',
      profile: '',
      support: '',
      status: '',
      subcontinent: '',
      vatNumber: '',
      zcode: '',
   },
   reducers: {
      setAccountData: (state, action) => {
         state._id = action.payload._id
         state.address = action.payload.address
         state.checkflag = action.payload.checkflag
         state.city = action.payload.city
         state.country = action.payload.country
         state.credit = action.payload.credit
         state.date = action.payload.date
         state.email = action.payload.email
         state.name = action.payload.name
         state.note = action.payload.note
         state.password = action.payload.password
         state.permission = action.payload.permission
         state.phone = action.payload.phone
         state.profile = action.payload.profile
         state.support = action.payload.support
         state.status = action.payload.status
         state.subcontinent = action.payload.subcontinent
         state.vatNumber = action.payload.vatNumber
         state.zcode = action.payload.zcode
         localStorage.setItem('user', JSON.stringify(action.payload))
      },
      clearAccountData: (state) => {
         state.id = ''
         state.address = ''
         state.checkflag = ''
         state.city = ''
         state.country = ''
         state.credit = ''
         state.date = ''
         state.email = ''
         state.name = ''
         state.note = ''
         state.password = ''
         state.permission = ''
         state.phone = ''
         state.profile = ''
         state.support = ''
         state.status = ''
         state.subcontinent = ''
         state.vatNumber = ''
         state.zcode = ''
         localStorage.removeItem('user')
      },
   },
})

// Action creators are generated for each case reducer function
export const { setAccountData, clearAccountData } = accountSlice.actions

export default accountSlice.reducer
