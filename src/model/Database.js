import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema';
//import migrations from './model/migrations'
import Task from './Task';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    dbName: 'task_manager',
    schema,
    jsi: true, /* Platform.OS === 'ios' */
    onSetUpError: error => {
        console.log(error)
    }
})

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [Task],
    actionsEnabled: true
})


