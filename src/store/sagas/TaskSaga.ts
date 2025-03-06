import auth, { firebase } from '@react-native-firebase/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import FirestoreHelper from '../../firebase/firestore/FirestoreHelper';
import { Timestamp } from '@react-native-firebase/firestore';
import { createTaskFailure, createTaskSuccess, deleteTaskFailure, deleteTaskSuccess, finishTaskFailure, finishTaskSuccess, getTaskFailure, getTaskSuccess } from '../slices/TaskSlice';


export interface ActionType{
    collectionName:string,
    docName:string, 
    teamName:string,
    assignedTo:string, 
    task:string, 
    dateAssigned:Timestamp, 
    dateDue:Timestamp
    memberId:string
    oldCollectionName:string
    newCollectionName:string
    index:number
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
        const {collectionName, memberId} = action.payload
        console.log("saga: " + memberId);
        let res = yield call(FirestoreHelper.getTasks, collectionName, memberId);

        yield put(getTaskSuccess({success: true, data: res}));
    }catch(e){
        yield put(getTaskFailure({success: false, data: e}));

    }

}

function* deleteTask(action:PayloadAction<ActionType>):Generator {
    try {
        const {collectionName, docName} = action.payload;
        let res = yield call(FirestoreHelper.deleteDocument, collectionName, docName);

        yield put(deleteTaskSuccess({success:true, data:res}))
    } catch (e) {
        yield put(deleteTaskFailure({success:false, data:e}))
    }
}

function* finishTask (action:PayloadAction<ActionType>):Generator {
    try {
        const {oldCollectionName, newCollectionName, docName, index} = action.payload;
        console.log("items finsh: " + oldCollectionName, newCollectionName, docName, index);
        let res = yield call(FirestoreHelper.copyDocument, oldCollectionName, newCollectionName, docName)
        yield call(FirestoreHelper.deleteDocument, oldCollectionName, docName);
        
        yield put(finishTaskSuccess({success:true, data:res, index:index}))
    } catch (e) {
        yield put(finishTaskFailure({success:false, data:e}))

    }
}


function* TaskSaga():Generator{
    yield takeLatest('CREATE_TASK', createTask);
    yield takeLatest('GET_TASKS', getTasks);
    yield takeLatest('DELETE_TASK', deleteTask);
    yield takeLatest('FINISH_TASK', finishTask);
}

export default TaskSaga;