
import "./doing.css";





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
            
            <div className="flex bg-amber-500  w-[80%] p-[9px] mt-[1rem] justify-center items-center gap-2">
                <p id='doing' className="text-white font-bold">Doing</p>
                <i className="fa-solid fa-plus plus text-white font-bold" data-bs-toggle="modal" data-bs-target="#exampleModal-doing"></i>
            </div>
            
            <TaskForm key="key2" status="doing" placeholder="Give title for doing" placeholder_two="Give description for doing"/>
        </>
    );
}



























// import React from 'react'
// import "./doing.css"

// export default function Doing(){
//   return (
//     <>
//         <div className="doing">
//           <p id='doing'>Doing</p>
//           <p><i class="fa-solid fa-plus plus"></i></p>
//           </div>
//     </>
//   )
// }
