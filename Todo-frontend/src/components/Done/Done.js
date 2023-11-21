
import "./done.css";





import React, { useContext, useEffect } from 'react';
import TaskContext from '../../context/tasks/taskContext';
import TaskForm from '../TaskForm/TaskForm'; // Import the common TaskForm component

export default function Doing() {
    const { getTasks } = useContext(TaskContext);

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            
            <div className="bg-lime-500 flex w-[80%] p-[9px] mt-[1rem] justify-center items-center gap-2">
                <p id='done' className="text-white font-bold">Done</p>
                <i className="fa-solid fa-plus plus text-white font-bold" data-bs-toggle="modal" data-bs-target="#exampleModal-done"></i>
            </div>
            
            <TaskForm key="key3" status="done" placeholder="Give title for done" placeholder_two="Give description for done"/>
        </>
    );
}






// import React from 'react'
// import "./done.css"

// export default function Done() {
//   return (
//     <>
//        <div className="done">
//           <p id='done'>Done</p>
//           <p><i class="fa-solid fa-plus plus"></i></p>
//           </div>
//     </>
//   )
// }
