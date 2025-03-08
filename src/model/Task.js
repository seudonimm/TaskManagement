import { Model } from "@nozbe/watermelondb";
import {date, field, text} from "@nozbe/watermelondb/decorators";

export default class Task extends Model{
    static table = 'tasks';

    @text('task_name_id') taskNameId
    @text('task') task
    @text('assigned_to') assignedTo
    @date('date_due_at') dateDueAt
    @date('date_assigned_at') dateAssignedAt

    // @action async getTask(){
    //     return{
    //         taskNameId: this.taskNameId,
    //         task: this.task,
    //         assignedTo: this.assignedTo,
    //         dateDueAt: this.dateDueAt,
    //         dateAssignedAt: this.dateAssignedAt
    //     }
    // }

    // @action async updateTask(){
    //     return await this.update((task) => {
    //         task.taskNameId = taskNameId,
    //         task.task = task,
    //         task.assignedTo = assignedTo,
    //         task.dateDueAt = dateDueAt,
    //         task.dateAssignedAt = dateAssignedAt
    //     })
    // }

    // @action async deleteTask(){
    //     return await this.update((task) => {
    //         this.markAsDeleted
    //         this.destroyPermanently();
    //     })
    // }
}
