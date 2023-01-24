import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers :{
        changeName(state){
            return 'johen'+state
        }
    }
})

export let { changeName }  = user.actions

// let stock = createSlice({
//     name : 'stock',
//     initialState : [10,11,12] 
// })
let item = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        stockUp(state,action){
            state[action.payload].count++;
        },
        addList(state,action){
            state.push(action.payload)
        },
    }
}) 
//action , payload로 구멍을 뚫어준다.

export let { stockUp,addList,checkList } = item.actions

export default configureStore({
    reducer: { 
        // user : user.reducer,
        // stock : stock.reducer
        item : item.reducer

    }
}) 