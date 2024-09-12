import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, getTodo, updateTodo, deleteTodo } from '../slice/todoSlice.js';
import "./todo.css";

const Todo = () => {
    const [title, setTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState(null);

    const todos =useSelector(state => state.todos.todos);
     
    
    // const todos = [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodo());
    }, [dispatch]);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(addTodo({ title }));
            setTitle('');
         }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editTitle.trim() && editId) {    
            dispatch(updateTodo({ _id: editId, title: editTitle,completed:false }));
            setEditTitle('');
            setEditId(null);
        }
    };

    const handleEditClick = (todo) => {
        setEditTitle(todo.title);
        setEditId(todo._id);
    };

    const handleCancelEdit = () => {
        setEditTitle('');
        setEditId(null);
    };

    return (
        <div>
            <h1>Todo List</h1>
            
            {/* Add Todo Form */}
            <form onSubmit={handleAddSubmit}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Add Todo....'
                />
                <button type="submit">ADD</button>
            </form>

            {/* Edit Todo Form */}
            {editId && (
                <form onSubmit={handleEditSubmit}>
                    <input
                        type='text'
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder='Edit Todo....'
                    />
                    <button type="submit">UPDATE</button>
                    <button type="button" onClick={handleCancelEdit}>CANCEL</button>
                </form>
            )}

            <ul>
                {todos && todos.length === 0 ? "TODO IS EMPTY" : 
                    todos.map(todo => (
                        <li key={todo._id}>
                            {todo.title}
                            <button onClick={() => handleEditClick(todo)}>Edit</button>
                            <button onClick={() => dispatch(deleteTodo(todo._id))}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Todo;
