import {createStore,applyMiddleware,combineReducers} from "redux";
import {thunk} from "redux-thunk";
import logger from "redux-logger";
import todoReducer from "./reducers/todoReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
export const store  = createStore(
    combineReducers({
        todos:todoReducer
      }),
      composeWithDevTools(
        applyMiddleware(logger, thunk) // Apply middleware with devtools
      )
);