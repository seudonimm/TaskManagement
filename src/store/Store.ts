import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "./slices/LoginSlice";
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger';
import rootSaga from "./sagas/rootSaga";
import TeamsSlice from "./slices/TeamsSlice";
import TaskSlice from "./slices/TaskSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';


const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, loginSlice.reducer);

export const store = configureStore({
    reducer: {
        login: persistedReducer,//listSlice.reducer
        //login: loginSlice.reducer,
        teams: TeamsSlice.reducer,
        tasks: TaskSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['list/retrieveData', "persist/PERSIST", "persist/REHYDRATE"],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['login.data', 'teams.members','meta.arg', 'payload.timestamp', 'payload.data.headers', 'payload.data.config.transformRequest.0', 'payload'],
                // Ignore these paths in the state
                ignoredPaths: ['login.data', 'teams.members', 'payload.data.headers', 'payload.data.config.transformRequest.0'],
              },
        }).concat(logger, sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);