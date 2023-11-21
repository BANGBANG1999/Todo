


import React, { useContext, useEffect } from 'react';
import TaskContext from '../../context/tasks/taskContext';
import TaskForm from '../TaskForm/TaskForm'; // Import the common TaskForm component
import "./todo.css";

export default function Todo() {
    const { getTasks } = useContext(TaskContext);

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            
            <div className="flex bg-fuchsia-500 w-[80%] p-[9px] mt-[1rem] justify-center items-center gap-2">
                <p id='todo' className='ml-[3px] text-[16px] font-bold text-white'>To Do</p>
                <i className="fa-solid fa-plus plus text-white" data-bs-toggle="modal" data-bs-target="#exampleModal-todo"></i>
            </div>
            
            <section><TaskForm key="key1" status="todo" placeholder="Give title for todo" placeholder_two="Give description for todo"/></section>
        </>
    );
}


