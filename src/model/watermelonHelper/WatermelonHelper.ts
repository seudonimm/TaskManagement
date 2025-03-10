import React from "react";
import { database } from "../Database";
import { Timestamp } from "@react-native-firebase/firestore";
import { syncFireMelon } from 'firemelon';
import { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import FirestoreHelper from "../../firebase/firestore/FirestoreHelper";
import * as util from 'util';
import { Database } from "@nozbe/watermelondb";

interface TaskType{
    taskName:string
    task:string
    assignedTo:string
    dateDue:Timestamp
    dateAssigned:Timestamp
}
class WatermelonHelper{

    saveTaskToDB = async(currentTask:TaskType, tableName:string) => {
        try{
            await database.write(async() => {
                const newTask = await database.get(tableName).create((task) => {
                    task.taskNameId = currentTask.taskName,
                    task.task = currentTask.task,
                    task.assignedTo = currentTask.assignedTo,
                    task.dateDueAt = currentTask.dateDue,
                    task.dateAssignedAt = currentTask.dateAssigned
                })
                console.log("save Task: " + newTask);
            })
        }catch(e){
            console.log(e);
        }
    }

    getTasksFromDB = async(tableName:string) => {
        try{
            const res = await database.get(tableName).query().fetch();
            console.log("get task: " + res);

            return res;
        }catch(e){
            console.log(e);
        }
    }

    syncFirestoreAndWatermelonDB = async(collectionName:string, memberId:string) => {
        try {
            // const syncObj = {
            //     col:firestore().collection('Tasks')
            // }
            // await syncFireMelon(database, syncObj, firestore, 'd', new Date);
            const col = await FirestoreHelper.getTasks(collectionName, memberId);
            let db = await this.getTasksFromDB('tasks');

            // console.log("db before: " + db);
            // console.log("col before: " + JSON.stringify(util.inspect(col[0]._data)));

            if(db == ''){
                for(let i = 0; i < col.length; i++){
                    await this.saveTaskToDB(col[i]._data, 'tasks');
                    db = await this.getTasksFromDB('tasks');
                }
                // await this.saveTaskToDB(col[0]._data, 'tasks');
                // db = await this.getTasksFromDB('tasks');
                // console.log('task saved');

            }
            // console.log("col: " + JSON.stringify(util.inspect(col)));
            // console.log("db after: " + JSON.stringify(util.inspect(db)));


        } catch (e) {
            console.log(e);  
        }
    }
    
}
export default new WatermelonHelper;