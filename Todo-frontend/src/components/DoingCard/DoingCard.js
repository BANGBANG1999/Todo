import React, { useContext, useRef, useState } from 'react'
import "./doingcard.css"
import ShowCard from '../ShowCard/ShowCard'
import TaskContext from '../../context/tasks/taskContext'
import { useDrop } from 'react-dnd';
import itemTypes from '../../utils/itemTypes';


function DoingCard({ status }) {
    
    const context = useContext(TaskContext);
    const { tasks, editTask, markAsDoing } = context;
    const [task, setTask] = useState({ etitle: "", edescription: "" })

    const ref = useRef(null);
    const closeRef = useRef(null);

    const updateTask = (currentNote) => {
        setTask({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description })
        ref.current.click()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        editTask(task.id, task.etitle, task.edescription, status)
        closeRef.current.click()
    }
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const doingTasks = tasks.filter((task) => task.status === 'doing');

    const [{isOver}, drop] = useDrop({
        accept: itemTypes.CARD,
        drop: (item, monitor) => {markAsDoing(item.ID, item.title, item.description, item.status)},
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })

    return (
        <>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={`#exampleModal-${status}-${status}`}>
                Launch demo modal
            </button>

            <div className="modal fade" id={`exampleModal-${status}-${status}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${status}-${status}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`exampleModalLabel-${status}-${status}`}>Edit Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" name="etitle" value={task.etitle} onChange={handleChange} id="formGroupExampleInput" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
                                <textarea className="form-control" name="edescription" value={task.edescription} onChange={handleChange} id="formGroupExampleInput2"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={task.etitle.length < 1 || task.edescription.length < 1} onClick={handleSubmit}>Add note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div ref={drop} className="bg-amber-100 h-[11rem] flex overflow-x-scroll w-[80%]">
                {doingTasks.map((task) => {
                    return <ShowCard key={task._id} updateTask={updateTask} title={task.title} description={task.description} task={task} />
                })}

            </div>

        </>

    )
}

export default DoingCard