import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState =  { todos:[] };

export const getTodo=createAsyncThunk(
    'todo/getTodo',
    async () => {
      const { data } = await axios.get("http://localhost:8000/api/todos");
      return data;
    }
);
export const addTodo=createAsyncThunk(
    'todo/addTodo',
    async (todo) => {
      const { data } =await axios.post("http://localhost:8000/api/todos",todo);
      return data;
    }
);

export const updateTodo=createAsyncThunk(
    'todo/updateTodo',
    async (todo) => {
      const { data } = await axios.put(`http://localhost:8000/api/todos/${todo._id}`,todo);
      return data;
    }
);
 export const deleteTodo=createAsyncThunk(
    'todo/deleteTodo',
    async (id) => {
        await axios.delete(`http://localhost:8000/api/todos/${id}`);
      return id;
    }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,

  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getTodo.fulfilled, (state, action) => {
        state.todos=action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos=[...state.todos, action.payload];
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos=state.todos.map((t) =>t._id === action.payload._id ? action.payload : t);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos=state.todos.filter((t) => t._id !== action.payload);
      })
      
  },
});


export default todoSlice.reducer;
