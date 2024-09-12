import { useState } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodoQuery, useUpdateTodoMutation } from "../api/todoSlice";
import "./todo.css";

const Todo = () => {
    const [title, setTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState(null);

    // Fetch todos using useGetTodoQuery (RTK Query hook)
    const { data: todos = [], isLoading, isError } = useGetTodoQuery();
   

    // Define mutations for add, update, and delete
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    // Handle add new todo
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (title.trim()) {
            await addTodo({ title ,completed:false}).unwrap(); // Call the mutation and unwrap the promise
            setTitle('');
        }
    };

    // Handle update todo
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (editTitle.trim() && editId) {
            await updateTodo({ _id: editId, title: editTitle, completed: false }).unwrap(); // Unwrap the promise
            setEditTitle('');
            setEditId(null);
        }
    };

    // Set the current todo for editing
    const handleEditClick = (todo) => {
        setEditTitle(todo.title);
        setEditId(todo._id);
    };

    // Cancel edit
    const handleCancelEdit = () => {
        setEditTitle('');
        setEditId(null);
    };

    // Display loading or error states if necessary
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching todos...</div>;
    }

    return (
        <div>
            <h1>Todo List</h1>
            
            {/* Add Todo Form */}
            <form onSubmit={handleAddSubmit}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Add Todo...'
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
                        placeholder='Edit Todo...'
                    />
                    <button type="submit">UPDATE</button>
                    <button type="button" onClick={handleCancelEdit}>CANCEL</button>
                </form>
            )}

            <ul>
                {todos.length === 0 ? "TODO IS EMPTY" : 
                    todos.map(todo => (
                        <li key={todo._id}>
                            {todo.title}
                            <button onClick={() => handleEditClick(todo)}>Edit</button>
                            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Todo;
