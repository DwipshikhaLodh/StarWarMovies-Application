import {createStore}  from "redux";

import singleRootReducer from "./reducers/index";


const store = createStore(singleRootReducer);

export default store;