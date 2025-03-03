import { createAction, createSlice, Slice } from "@reduxjs/toolkit";
import store from "../Store";

interface LoginSliceType{
    user:object
    name:string
    loggedIn:boolean
    leader:boolean
    data: object
}
interface StateType{
    user:object
    name:string
    loggedIn:boolean
    leader:boolean
    data: object
}
const loginSlice:Slice = createSlice({
    name: 'login',
    initialState: {
        user: {},
        name: '',
        loggedIn: false,
        leader: false,
        data: {}
    },
    reducers:{
        createAccount: (state, action) => {
            //state.user = null;
        },
        createAccountSuccess: (state:StateType, action) => {
            //state.user = action.payload;
            state.name = action.payload.name
            state.user = action.payload.data
            state.loggedIn = true;
            state.leader = action.payload.leader;
            console.log(state);
            //store.dispatch({type:'SET_AUTH', payload:{collectionName:'Users', name:name, email:email, leader:leader}})
        },
        createAccountFailure: () => {
            //state.user = null
            console.log("error");
        },
        login: () => {
            //state.user = null;
        },
        loginSuccess: (state:StateType, action) => {
            state.user = action.payload.data;
            state.loggedIn = true;
            state.leader = action.payload.authRes._data.leader
            state.data = action.payload.authRes
        },
        loginFailed: () => {
            //state.user = null;
        },
        logout: () => {

        },
        logoutSuccess: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
            state.leader = false;
            state.user = {};
            state.data = {}
            
        },
        logoutFailed: () => {
        },
        passwordReset: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
        },
        passwordResetSuccess: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
        },
        passwordResetFailure: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
        },
        setAuthVariables: (state:StateType) => {
            
        },
        setAuthVariablesSuccess: (state:StateType) => {
            
        },
        setAuthVariablesFailure: (state:StateType) => {
            
        }

    }
});

export const {
    createAccount, 
    createAccountSuccess, 
    createAccountFailure,
    login,
    loginSuccess,
    loginFailed,
    logout,
    logoutSuccess,
    logoutFailed,
    passwordReset,
    passwordResetSuccess,
    passwordResetFailure,
    setAuthVariables,
    setAuthVariablesSuccess,
    setAuthVariablesFailure
} = loginSlice.actions;

export default loginSlice;