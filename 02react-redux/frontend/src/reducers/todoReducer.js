import { ADD_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO } from "../constants";

export default function todoReducer(state = { todos:[] }, action) {
  switch (action.type) {
    case GET_TODO:
      return { ...state, todos: action.payload };

    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] }; // Add the new todo to the list

    case UPDATE_TODO:  
      return {
        ...state,
        todos:state.todos.map((t) =>t._id === action.payload._id ? action.payload : t), // Replace the old todo with the updated one
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((t) => t._id !== action.payload), // Remove the todo by filtering out the matching ID
      };

    default:
      return state;
  }
}
