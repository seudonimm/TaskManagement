import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "./slices/LoginSlice";
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger';
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage
// };

//const persistedReducer = persistReducer(persistConfig, listSlice.reducer);

const store = configureStore({
    reducer: {
        //list: persistedReducer,//listSlice.reducer
        login: loginSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['list/retrieveData', "persist/PERSIST", "persist/REHYDRATE"],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.data.headers', 'payload.data.config.transformRequest.0', 'payload'],
                // Ignore these paths in the state
                ignoredPaths: ['list.value', 'payload.data.headers', 'payload.data.config.transformRequest.0'],
              },
        }).concat(logger, sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>
//export const persistor = persistStore(store);