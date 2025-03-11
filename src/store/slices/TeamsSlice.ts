import { createAction, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { TeamsActionType } from "../sagas/TeamsSaga";

interface StateType {
    members:object
    teams:any //come back to this
}
interface ActionType{
    success:boolean
    data:object
    teamName?:string
    memberName?:string
}
const TeamsSlice:Slice = createSlice({
    name: 'teams',
    initialState:{
        members:{},
        teams:{}
    },
    reducers: {
        getTeamsData: (state:StateType) => {
            
        },
        getTeamsDataSuccess: (state:StateType, action:PayloadAction<ActionType>) => {
            state.teams = action.payload.data._data.teams;
        },
        getTeamsDataFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            state.teams = action.payload.data;
        },
        getMemberUsers: () => {

        },
        getMemberUsersSuccess: (state:StateType, action:PayloadAction<ActionType>) => {

            state.members = action.payload.data
        },
        getMemberUsersFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            state.members = action.payload.data
        },
        createTeam: () => {

        },
        createTeamSuccess: (state:StateType, action:PayloadAction<ActionType>) => {
            console.log(action.payload);
            let obj ={
                name:action.payload.teamName,
                members:[]
            }
            state.teams[action.payload.teamName] = obj;
        },
        createTeamFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            //state.data = action.payload.data
        },
        addMemberToTeam: () => {

        },
        addMemberToTeamSuccess: (state:StateType, action:PayloadAction<ActionType>) => {
            console.log("action loged:" + action.payload.data);
            state.teams[action.payload.teamName].members.push(action.payload.data);
            //console.log("add member: " +JSON.stringify(action.payload))
        },
        addMemberToTeamFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            console.log("add member: " + action.payload)

        },
        deleteTeam: () => {

        },
        deleteTeamSuccess: (state:StateType, action:PayloadAction<ActionType>) => {
            console.log("action loged:" + action.payload.data);
            state.teams[action.payload.teamName].members.push(action.payload.data);
            //console.log("add member: " +JSON.stringify(action.payload))
        },
        deleteTeamFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            console.log("add member: " + action.payload)

        },
        
        
    }
})

export default TeamsSlice;

export const {
    getTeamsData,
    getTeamsDataSuccess,
    getTeamsDataFailure,
    getMemberUsers,
    getMemberUsersSuccess,
    getMemberUsersFailure,
    createTeam,
    createTeamSuccess,
    createTeamFailure,
    addMemberToTeam,
    addMemberToTeamSuccess,
    addMemberToTeamFailure,
    deleteTeam,
    deleteTeamSuccess,
    deleteTeamFailure
} = TeamsSlice.actions