// slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

const rootReducer = combineReducers({
  board: boardReducer,
  // Add other reducers here if needed
});

export default rootReducer;
