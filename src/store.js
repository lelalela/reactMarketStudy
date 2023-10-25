import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js';

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
      reducers: {
        changeCount(state, action) {
            let idx = state.findIndex((item) => { return item.id == action.payload });
            state[idx].count += 1;
        },
        addProduct(state, action){

            let data = state.find((item) => item.id == action.payload.id);
            
            if(data != null) {
                data.count += 1;
            }else{
                state.push({id: action.payload.id, name : action.payload.title, count : 1})
            }
        },
      }
})

export let { changeCount, addProduct } = cart.actions;

export default configureStore({ 
    reducer: {
        user : user.reducer,
        cart : cart.reducer
    } 
});