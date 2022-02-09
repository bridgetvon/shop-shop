import { useReducer } from 'react';
//reducers accept the following parameters: the current state object so we can copy it for new state
//and the action we are performing to update the state which is broken up into an objects 
//type and value. type is the kind of action we are performingand should be a predefined action created earlier
//value represents the new data we want to use with action 

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/actions';

export const reducer = (state, action) => {
    switch (action.type) {
        //if action value is the value of update products return a new state onject with updated products array 
        case UPDATE_PRODUCTS: 
        return {
            ...state,
            products: [...action.products],
        };
        case UPDATE_CURRENT_CATEGORY: 
        return {
            ...state,
            currentCategory: action.currentCategory
        }
        //if its none of these actions do not update the state
        default: 
        return state;
        case ADD_TO_CART: 
        return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.product]
        };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        case REMOVE_FROM_CART: 
        let newState = state.cart.filter(product => {
            return product._id !==action._id;
        });
        return {
            ...state,
            cartOpen: newState.length> 0,
            cart: newState
        };
        case UPDATE_CART_QUANTITY: 
        return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
            })
        };
        case CLEAR_CART: 
        return {
            ...state,
            cartOpen: false,
            cart: []
        };
        case TOGGLE_CART: 
        return {
            ...state,
            cartOpen: !state.cartOpen
        };
    }
};

//this function helpos initialize our global state object and provide us functionality for updating that state by automatically running it through our custom reducer fucnction 
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}