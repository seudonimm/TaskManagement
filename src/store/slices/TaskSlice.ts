import { createSlice, Slice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    data:object
}
interface ActionType{
    success:boolean
    data:DataType

}
interface DataType{
    _docs:Array<object>

}

const TaskSlice:Slice = createSlice({
    name: 'task',
    initialState: {
        data: {},

    },
    reducers: {
        createTask: (state:StateType, action:PayloadAction<ActionType>) => {
            
        },
        createTaskSuccess: (state:StateType, action:PayloadAction<ActionType>) => {
            //state.data = action.payload.data
        },
        createTaskFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            //state.data = action.payload.data

        },
        getTask: (state:StateType, action:PayloadAction<ActionType>) => {
            
        },
        getTaskSuccess: (state:StateType, action:PayloadAction<ActionType>) => {
            state.data = action.payload.data

        },
        getTaskFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            
        },
        deleteTask: () => {

        },
        deleteTaskSuccess: (state:StateType, action:PayloadAction<ActionType>) => {

        },
        deleteTaskFailure: (state:StateType, action:PayloadAction<ActionType>) => {

        },
        finishTask: () => {

        },
        finishTaskSuccess: (state:StateType, action:PayloadAction<ActionType>) => {
            let arr = state.data;
            arr._docs.splice(action.payload.index, 1);
            state.data = arr;
            //state.data._docs = state.data._docs.splice(action.payload.index, 1)
        },
        finishTaskFailure: (state:StateType, action:PayloadAction<ActionType>) => {

        },


    }
});

export default TaskSlice;

export const {
    createTask,
    createTaskSuccess,
    createTaskFailure,
    getTask,
    getTaskSuccess,
    getTaskFailure,
    deleteTask,
    deleteTaskSuccess,
    deleteTaskFailure,
    finishTask,
    finishTaskSuccess,
    finishTaskFailure
} = TaskSlice.actions