import { ADD_TODO,GET_TODO,UPDATE_TODO,DELETE_TODO } from "../constants";
import axios from "axios";

export const getTodo=()=>async(dispatch)=>{
   const {data}=await axios.get("http://localhost:8000/api/todos");
   dispatch({type:GET_TODO,payload:data});
}

export const addTodo=(todo)=>async(dispatch)=>{
    const {data}=await axios.post("http://localhost:8000/api/todos",todo);
    dispatch({type:ADD_TODO,payload:data});
}

export const updateTodo=(todo)=>async(dispatch)=>{
    const {data}=await axios.put(`http://localhost:8000/api/todos/${todo._id}`,todo);
    dispatch({type:UPDATE_TODO,payload:data});
}

export const deleteTodo=(id)=>async(dispatch)=>{
    await axios.delete(`http://localhost:8000/api/todos/${id}`);
    dispatch({type:DELETE_TODO,payload:id});
 }
