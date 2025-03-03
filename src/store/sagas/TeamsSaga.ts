import auth from '@react-native-firebase/auth'
import FirestoreHelper from '../../firebase/firestore/FirestoreHelper';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { addMemberToTeamFailure, addMemberToTeamSuccess, createTeamFailure, createTeamSuccess, getMemberUsersFailure, getMemberUsersSuccess, getTeamsDataFailure, getTeamsDataSuccess } from '../slices/TeamsSlice';
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
        yield put(createTeamSuccess({success: true, data: res, teamName:teamName}))
    } catch (e) {
        yield put(createTeamFailure({success: false, data: {e}}))
    }
}

function* addMemberToTeam (action:PayloadAction<TeamsActionType>):Generator {
    const {collectionName, docName, teamName, memberName, memberId} = action.payload
    
    try {
        let res = yield call(FirestoreHelper.addMemberToTeam, collectionName, docName, teamName, memberName, memberId);

        yield put(addMemberToTeamSuccess({success: true, data:res, teamName:teamName, memberName:memberName}));

    } catch (e) {
        yield put(addMemberToTeamFailure({success: false, data:{e}}));

    }
}

function* TeamsSaga ():Generator {
    yield takeLatest('GET_TEAMS_DATA', getTeams);
    yield takeLatest('GET_MEMBER_USERS', getMemberUsers);
    yield takeLatest('CREATE_TEAM', createTeam);
    yield takeLatest('ADD_MEMBER_TO_TEAM', addMemberToTeam)
}

export default TeamsSaga;