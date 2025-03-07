import React from "react";
import { database } from "../Database";
import { Timestamp } from "@react-native-firebase/firestore";

interface TaskType{
    taskName:string
    task:string
    assignedTo:string
    dateDue:Timestamp
    dateAssigned:Timestamp
}
class WatermelonHelper{

    saveTaskToDB = async(currentTask:TaskType) => {
        try{
            await database.write(async() => {
                const newTask = await database.get('tasks').create((task) => {
                    task.taskNameId = currentTask.taskName,
                    task.task = currentTask.task,
                    task.assignedTo = currentTask.assignedTo,
                    task.dateDueAt = currentTask.dateDue.toDate(),
                    task.dateAssignedAt = currentTask.dateAssigned.toDate()
                })
                console.log("save Task: " + newTask);
            })
        }catch(e){
            console.log(e);
        }
    }

    getTasksFromDB = async() => {
        try{
            const res = await database.get('tasks').query().fetch();
            console.log("get task: " + res);

            return res;
        }catch(e){
            console.log(e);
        }
    }
    
}
export default new WatermelonHelper;