import { act } from "react-dom/test-utils";

export const initialState = {
    newDate:'',
    newExpense:'',
    newAmount:'',
    newDescription:'',
    inputError:'',
}

export function reducer(state, action){
    switch(action.type){
        case 'clearInputFields':
            return{
                newDate:'',
                newExpense:'',
                newAmount:'',
                newDescription:'',
                inputError:'',
            };

        case'setNewDescription':
            return{
                ...state,
                newDescription: action.input
            };

        case'setNewDate':
            return{
                ...state,
                newDate: action.input
            };
            
        case'setNewAddress':
            return{
                ...state,
                newExpense: action.input
            };

        case'setNewAmount':
            return{
                ...state,
                newAmount: action.input
            };
      
        case'setInputError':
            return{
                ...state, 
                inputError: action.inputError
            };

        default:
            return state;
    }
}