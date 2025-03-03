import { fork } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";
import TeamsSaga from "./TeamsSaga";

export default function* rootSaga():Generator{
    yield fork(LoginSaga);
    yield fork(TeamsSaga);
}