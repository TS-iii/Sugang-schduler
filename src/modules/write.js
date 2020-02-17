import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';



const REGISTER='write/REGISTER';


export const register=createAction(

    REGISTER,

    ({ form,value})=>({

        form,
        value,
    })

);


const initialState={

    type1:[],
    type2:[],
    type3:[],
    
}

const write=handleActions(

    {
        [REGISTER]: (state, {payload:{form,value}})=>
                produce(state,draft=>{
                    draft[form].push(value);
                }),

    }

    ,initialState
);


export default write;