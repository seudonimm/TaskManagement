import { database } from "../..";

const tasks = database.collections.get('tasks');

export default{
    observeTasks: () => tasks.query().observe(),
    createTask: async({taskNameId, task, assignedTo, dateDueAt, dateAssignedAt}) => {
        await database.action(async() => {
            await tasks.create((task) => {
                task.taskNameId = taskNameId,
                task.task = task,
                task.assignedTo = assignedTo,
                task.dateDueAt = dateDueAt,
                task.dateAssignedAt = dateAssignedAt
            })
        })
    },
}