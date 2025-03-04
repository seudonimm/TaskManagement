import { fork } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";
import TeamsSaga from "./TeamsSaga";
import TaskSaga from "./TaskSaga";

export default function* rootSaga():Generator{
    yield fork(LoginSaga);
    yield fork(TeamsSaga);
    yield fork(TaskSaga);
}