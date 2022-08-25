import usersReducer from "./reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  data: usersReducer,
});

export default rootReducer;
