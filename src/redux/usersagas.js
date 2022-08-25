import * as types from "./actionTypes";

import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserError,
  updateUserSuccess,
} from "./action";
import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
} from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess(response?.data));
    }
  } catch (error) {
    yield put(createUserError(error?.response?.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    console.log("first", userId);
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error?.response?.data));
  }
}

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

function* onDeleteUser(userId) {
  console.log("id", userId);
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USER_START, onLoadUsersStartAsync);
}

function* onCreateUsers() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onUpdateUsers() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUsers),
  fork(onDeleteUser),
  fork(onUpdateUsers),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
