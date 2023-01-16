import { createSlice } from '@reduxjs/toolkit'

export const isNetworkAvailableSlice = createSlice({
    name: 'isNetworkAvailable',
    initialState: {
        value: true,
    },
    reducers: {
        setNetworkAvailable: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setNetworkAvailable } = isNetworkAvailableSlice.actions

export default isNetworkAvailableSlice.reducer