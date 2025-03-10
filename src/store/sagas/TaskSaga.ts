import auth, { firebase } from '@react-native-firebase/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import FirestoreHelper from '../../firebase/firestore/FirestoreHelper';
import { Timestamp } from '@react-native-firebase/firestore';
import { creatCommentFailure, creatCommentSuccess, createTaskFailure, createTaskSuccess, deleteTaskFailure, deleteTaskSuccess, finishTaskFailure, finishTaskSuccess, getTaskFailure, getTaskSuccess } from '../slices/TaskSlice';
import { Alert } from 'react-native';


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
    finishedData:object
    taskName:string
    name:string 
    id:string 
    message:string
}


type ResultType = {
    user?:object
}

function* createTask(action:PayloadAction<ActionType>):Generator{
    try{
        const {collectionName, docName, teamName, assignedTo, task, dateAssigned, dateDue} = action.payload
        let res = yield call(FirestoreHelper.createTask, collectionName, docName, teamName, assignedTo, task, dateAssigned, dateDue);
        Alert.alert('Task Created');
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
        let finishedRes = yield call(FirestoreHelper.getFinishedTasks, collectionName);

        yield put(getTaskSuccess({success: true, data: res, finishedData: finishedRes}));
    }catch(e){
        yield put(getTaskFailure({success: false, data: e}));

    }

}
function* getAllTasks(action:PayloadAction<ActionType>):Generator{
    try{
        const {collectionName} = action.payload
        let res = yield call(FirestoreHelper.getAllTasks, collectionName);
        let finishedRes = yield call(FirestoreHelper.getFinishedTasks, collectionName);

        yield put(getTaskSuccess({success: true, data: res, finishedData: finishedRes}));
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

function* createComment (action:PayloadAction<ActionType>):Generator {
    try {
        const {taskName, name, id, message, index} = action.payload;
        let res = yield call(FirestoreHelper.createComment, taskName, name, id, message);
        console.log("created comment: " + res);
        yield put(creatCommentSuccess({success:true, data:res, index:index, comments: {
            name:name,
            id:id,
            message:message,
            timeSent:Timestamp.now()
        }}))
        console.log("saga working");
    } catch (e) {
        console.log(e);
        yield put(creatCommentFailure({success:false, data:e}))

    }
}

function* TaskSaga():Generator{
    yield takeLatest('CREATE_TASK', createTask);
    yield takeLatest('GET_TASKS', getTasks);
    yield takeLatest('GET_ALL_TASKS', getAllTasks);
    yield takeLatest('DELETE_TASK', deleteTask);
    yield takeLatest('FINISH_TASK', finishTask);
    yield takeLatest('CREATE_COMMENT', createComment)
}

export default TaskSaga;