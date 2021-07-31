import { combineReducers } from "redux";

import Weather from "./weatherReducer";

const rootReducer = combineReducers({ Weather });

export default rootReducer;
