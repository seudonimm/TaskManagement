import auth from '@react-native-firebase/auth'
import FirestoreHelper from '../../firebase/firestore/FirestoreHelper';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { addMemberToTeamFailure, addMemberToTeamSuccess, createTeamFailure, createTeamSuccess, deleteTeamFailure, deleteTeamSuccess, getMemberUsersFailure, getMemberUsersSuccess, getTeamsDataFailure, getTeamsDataSuccess } from '../slices/TeamsSlice';
import { createAccountFailure, createAccountSuccess } from '../slices/LoginSlice';
import { collection } from '@react-native-firebase/firestore';

export interface TeamsActionType{
    email:string
    collectionName:string
    docName:string
    teamName:string
    memberName:string
    memberId:string
}

function* getTeams(action:PayloadAction<TeamsActionType>):Generator {
    const {email} = action.payload;
    try {
        let res = yield call(FirestoreHelper.getFirestoreData, 'Users', email);

        yield put(getTeamsDataSuccess({success: true, data: res}));
        
    } catch (e) {
        yield put(getTeamsDataFailure({success: false, data: {e}}));

    }
}

function* getMemberUsers(action:PayloadAction<TeamsActionType>):Generator {
    const {collectionName, teamName} = action.payload;
    try {
        let res = yield call(FirestoreHelper.getMemberUsers, collectionName, teamName);

        yield put(getMemberUsersSuccess({success: true, data: res}));
        
    } catch (e) {
        yield put(getMemberUsersFailure({success: false, data: {e}}));

    }
}

function* createTeam (action:PayloadAction<TeamsActionType>):Generator {
    const {collectionName, docName, teamName} = action.payload
    try {
        let res = yield call(FirestoreHelper.createTeam, collectionName,docName,teamName);
        let obj ={
            name:teamName,
            members:[]
        }
        yield put(createTeamSuccess({success: true, data: obj, teamName:teamName}))
    } catch (e) {
        yield put(createTeamFailure({success: false, data: {e}}))
    }
}

function* addMemberToTeam (action:PayloadAction<TeamsActionType>):Generator {
    const {collectionName, docName, teamName, memberName, memberId} = action.payload
    
    try {
        let res = yield call(FirestoreHelper.addMemberToTeam, collectionName, docName, teamName, memberName, memberId);

        yield put(addMemberToTeamSuccess({success: true, data:{name:memberName, id:memberId}, teamName:teamName, memberName:memberName}));

    } catch (e) {
        yield put(addMemberToTeamFailure({success: false, data:{e}}));

    }
}
function* deleteTeam(action:PayloadAction<ActionType>):Generator {
    try {
        const {collectionName, docName} = action.payload;
        let res = yield call(FirestoreHelper.deleteDocument, collectionName, docName);

        yield put(deleteTeamSuccess({success:true, data:res}))
    } catch (e) {
        yield put(deleteTeamFailure({success:false, data:e}))
    }
}

function* TeamsSaga ():Generator {
    yield takeLatest('GET_TEAMS_DATA', getTeams);
    yield takeLatest('GET_MEMBER_USERS', getMemberUsers);
    yield takeLatest('CREATE_TEAM', createTeam);
    yield takeLatest('ADD_MEMBER_TO_TEAM', addMemberToTeam)
}

export default TeamsSaga;