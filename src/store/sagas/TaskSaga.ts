import auth, { firebase } from '@react-native-firebase/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import FirestoreHelper from '../../firebase/firestore/FirestoreHelper';
import { Timestamp } from '@react-native-firebase/firestore';
import { createTaskFailure, createTaskSuccess, getTaskFailure, getTaskSuccess } from '../slices/TaskSlice';


export interface ActionType{
    collectionName:string,
    docName:string, 
    teamName:string,
    assignedTo:string, 
    task:string, 
    dateAssigned:Timestamp, 
    dateDue:Timestamp
}


type ResultType = {
    user?:object
}

function* createTask(action:PayloadAction<ActionType>):Generator{
    try{
        const {collectionName, docName, teamName, assignedTo, task, dateAssigned, dateDue} = action.payload
        let res = yield call(FirestoreHelper.createTask, collectionName, docName, teamName, assignedTo, task, dateAssigned, dateDue);

        yield put(createTaskSuccess({success: true, data: res}));
    }catch(e){
        yield put(createTaskFailure({success: false, data: e}));

    }

}

function* getTasks(action:PayloadAction<ActionType>):Generator{
    try{
        const {collectionName} = action.payload
        let res = yield call(FirestoreHelper.getTasks, collectionName);

        yield put(getTaskSuccess({success: true, data: res}));
    }catch(e){
        yield put(getTaskFailure({success: false, data: e}));

    }

}



function* TaskSaga():Generator{
    yield takeLatest('CREATE_TASK', createTask);
    yield takeLatest('GET_TASKS', getTasks);
}

export default TaskSaga;