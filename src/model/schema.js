import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
        name: 'tasks',
        columns: [
            {name: 'task_name_id', type: 'string'},
            {name: 'task', type: 'string'},
            {name: 'assigned_to', type: 'string'},
            {name: 'date_due_at', type: 'number'},
            {name: 'date_assigned_at', type: 'number'}
        ]
    }),
    tableSchema({
        name: 'users',
        columns: [
            {name: 'email_id', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'is_leader', type: 'boolean'}
        ]
    }),
    tableSchema({
      name: 'finished_tasks',
      columns: [
        {name: 'task_name_id', type: 'string'},
        {name: 'task', type: 'string'},
        {name: 'assigned_to', type: 'string'},
        {name: 'date_due_at', type: 'number'},
        {name: 'date_assigned_at', type: 'number'}
    ]
})

  ]
})