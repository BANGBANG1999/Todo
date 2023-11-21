// import React from 'react'
import React, { useContext } from 'react'
import "./showcard.css"
import TaskContext from '../../context/tasks/taskContext'
import { useDrag } from 'react-dnd';
import itemTypes from '../../utils/itemTypes';


function ShowCard({ title, description, task, updateTask }) {
    const context = useContext(TaskContext);
    const { deleteTask, tasks } = context;


    const [{ isDragging }, drag] = useDrag({
        type: itemTypes.CARD,
        item: {
            ID: task._id, // Include ID as a property in the item object
            title: task.title,
            description: task.description,
            status: task.status,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    return (

        <>
            <div ref={drag} style={{ opacity: isDragging ? "0.5" : "1" }} className="showcard xl:ml-[1rem] xl:min-w-[20rem] xsm:min-w-[15rem] xl:max-w-[20rem] xsm:max-w-[20rem] xsm:ml-[4px]">
                    <div className="task-card bg-white xl:min-w-[20rem]">
                    <div className="card-content">
                        <h2 className="font-bold text-[15px]">{title}</h2>
                        <div className="text-[13px] break-words mt-[10px]">{description}</div>
                    </div>
                    <div className="mt-[8px]">
                        <i class="fa-regular fa-pen-to-square edit" onClick={() => { updateTask(task) }} style={{ marginRight: "1rem", marginTop: "1rem" }}></i>
                        <i class="fa-solid fa-trash delete" onClick={() => { deleteTask(task._id) }} style={{ marginTop: "1rem" }}></i>
                    </div>
                </div>

            </div>

        </>

    )
}

export default ShowCard
