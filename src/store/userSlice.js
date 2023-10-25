import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name: 'user',
    initialState: {name : 'kim', age : 20},
    reducers: {
        changeName(state){
            return {...state, name : 'park'};
        },
        increase(state, action){
            state.age += Number(action.payload);
        }
    }
})

export let { changeName, increase } =  user.actions;

export default user;