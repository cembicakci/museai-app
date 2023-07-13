import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    login: false,
    anonym: false,
    user: {}
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser: (state, { payload }) => {
            state[payload.state] = payload.data
        }
    }
})

export const { changeUser } = slice.actions
export default slice.reducer