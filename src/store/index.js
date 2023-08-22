import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./Slices/user.slice"
import collectionSlice from "./Slices/collection.slice";
import exploreSlice from "./Slices/explore.slice";
import saveSlice from "./Slices/save.slice"
const reducers = {
    auth:authReducer.reducer,
    collection:collectionSlice.reducer,
    explore:exploreSlice.reducer,
    save:saveSlice.reducer,
}
export const store = configureStore({
    reducer:reducers,
    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});