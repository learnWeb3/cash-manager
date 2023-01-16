import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        value: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer