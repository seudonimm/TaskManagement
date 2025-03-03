import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamsActionType } from "../sagas/TeamsSaga";

interface StateType {
    members:object
    teams:any //come back to this
}
interface ActionType{
    success:boolean
    data:object
    teamName?:string
}
const TeamsSlice = createSlice({
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
        }
        
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
    createTeamFailure
} = TeamsSlice.actions