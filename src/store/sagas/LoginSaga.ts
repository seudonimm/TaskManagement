import auth, { firebase } from '@react-native-firebase/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { createAccountFailure, createAccountSuccess, loginFailed, loginSuccess, logoutFailed, logoutSuccess, passwordResetFailure, passwordResetSuccess, setAuthVariablesFailure, setAuthVariablesSuccess } from '../slices/LoginSlice';
import { Alert } from 'react-native';
import { PayloadAction } from '@reduxjs/toolkit';
import FirestoreHelper from '../../firebase/firestore/FirestoreHelper';


export interface ActionType{
    name:string,
    email:string,
    password?:string,
    leader:boolean,
    collectionName:string
}


type ResultType = {
    user?:object
}

function* logInToAccount(action:PayloadAction<ActionType>):Generator{
    try{
        const {email, password} = action.payload;
        console.log('login dispatched')
        let res = yield call(auth().signInWithEmailAndPassword, email, password);
        let authRes = yield call(FirestoreHelper.getFirestoreData, 'Users', email);
        //console.log('res ' + res);
        yield put(loginSuccess({...res.user, authRes:{...authRes._data}}));
    }catch(e:any){
        console.log('fffff')
        if(e.code === 'auth/email-already-in-use'){
            console.log('That email address is already in use!');
        }
        if(e.code === 'auth/invalid-email'){
            console.log('That email address is invalid!');
        }
        //Alert.alert(e);
        yield put(loginFailed(e));
    }

}

function* setAuthVars(action:PayloadAction<ActionType>):Generator{
    const {name, email, leader, collectionName} = action.payload;

    try {
        let res = yield call(FirestoreHelper.accountCreationSet, collectionName, name, leader, email);
        yield put(setAuthVariablesSuccess(res));
    } catch (e) {
        console.log(e);
        yield put(setAuthVariablesFailure(e));
    }
}
function* createAccount(action:PayloadAction<ActionType>):Generator{
    //yield console.log("THIS ONE RIGHT HERE: " + JSON.stringify(call(auth().createUserWithEmailAndPassword, email, password)));
    try{
        const {name, email, password, leader} = action.payload;
        console.log('create account dispatched')
        let res = yield call(auth().createUserWithEmailAndPassword, email, password);
        //console.log('res ' + res);
        yield put(createAccountSuccess({data:res.user, name:name, leader:leader}));
    }catch(e:any){
        console.log('fffff')
        if(e.code === 'auth/email-already-in-use'){
            console.log('That email address is already in use!');
        }
        if(e.code === 'auth/invalid-email'){
            console.log('That email address is invalid!');
        }
        console.log(e);
        yield put(createAccountFailure(e));
    }
}

function* changePassword(action:PayloadAction<ActionType>):Generator{
    try {
        const {email} = action.payload;
        console.log("email "+email)
        let res = yield call(auth().sendPasswordResetEmail, email);
        yield put(passwordResetSuccess(res));
    } catch (e:any) {
        console.log(e);
        yield put(passwordResetFailure(e));
    }

}

function* logout():Generator{
    try{
        //const {email, password} = action.payload;
        console.log('alfkdjs')
        let res = yield call(auth().signOut);
        //console.log('res ' + res);
        yield put(logoutSuccess(res));
    }catch(e:any){

        console.log(e);
        yield put(logoutFailed(e));
    }

}

function* LoginSaga():Generator{
    yield takeLatest('LOG_IN', logInToAccount);
    yield takeLatest('CREATE_ACCOUNT', createAccount);
    yield takeLatest('CHANGE_PASSWORD', changePassword);
    yield takeLatest('LOGOUT', logout);
    yield takeLatest('SET_AUTH', setAuthVars);
}

export default LoginSaga;