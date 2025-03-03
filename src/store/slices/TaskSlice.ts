import { createSlice, Slice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    data:object
}
interface ActionType{
    success:boolean
    data:object

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
            state.data = action.payload.data
        },
        createTaskFailure: (state:StateType, action:PayloadAction<ActionType>) => {
            state.data = action.payload.data

        }
    }
});

export default TaskSlice;

export const {
    createTask,
    createTaskSuccess,
    createTaskFailure
} = TaskSlice.actions