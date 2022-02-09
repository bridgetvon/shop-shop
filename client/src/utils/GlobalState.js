//create context will be used to instantiate a new cointext objects 
//we use it to create a container to hold our global state data and functionallity 
//use context is a react hook that allows us to use state from the ceate context funtion 
import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext();
//every context comes with two components, a provider and a consumer 
//the provider is a special react component that we wrap our application in so it can make the state data thats passed into it as a prop available to all other componenents
// the consumer is our means of grabbing and using data the provider holds for us 
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch ] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
    });
    //console to confrim it works 
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext};

