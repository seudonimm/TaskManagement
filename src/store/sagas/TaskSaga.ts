import auth, { firebase } from '@react-native-firebase/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import FirestoreHelper from '../../firebase/firestore/FirestoreHelper';
import { Timestamp } from '@react-native-firebase/firestore';
import { createTaskSuccess } from '../slices/TaskSlice';
import { createAccountFailure } from '../slices/LoginSlice';


export interface ActionType{
    collectionName:string,
    docName:string, 
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
        const {collectionName, docName, assignedTo, task, dateAssigned, dateDue} = action.payload
        let res = yield call(FirestoreHelper.createTask, collectionName, docName, assignedTo, task, dateAssigned, dateDue);

        yield put(createTaskSuccess({success: true, data: res}));
    }catch(e:any){
        yield put(createAccountFailure({success: false, data: e}));

    }

}



function* TaskSaga():Generator{
    yield takeLatest('CREATE_TASK', createTask)
}

export default TaskSaga;