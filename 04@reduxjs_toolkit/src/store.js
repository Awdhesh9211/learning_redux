import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk"; // Fix the import
import logger from "redux-logger";
import { todoApi } from "./api/todoSlice";
import { composeWithDevTools } from "redux-devtools-extension";

// Update store setup
export const store = createStore(
  combineReducers({
    [todoApi.reducerPath]: todoApi.reducer,
  }),
  composeWithDevTools(
    applyMiddleware(
      logger,
      thunk,
      todoApi.middleware // Add the RTK Query middleware here
    )
  )
);
