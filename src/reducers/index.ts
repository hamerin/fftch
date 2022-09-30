import { combineReducers } from "redux";
import { configSlice } from "./config";
import { infoSlice } from "./info";

const rootReducer = combineReducers({
  info: infoSlice.reducer,
  config: configSlice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
