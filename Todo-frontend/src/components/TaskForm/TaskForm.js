import React, { useContext, useRef, useState } from 'react';
import TaskContext from '../../context/tasks/taskContext';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const TaskForm = ({ status, placeholder, placeholder_two }) => {
    const { addTask } = useContext(TaskContext);

    const [task, setTask] = useState({ title: "", description: "" });

    const ref = useRef(null);
    const closeRef = useRef(null);
    // const closeRef2 = useRef(null);
    // const closeRef3 = useRef(null);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task.title, task.description, status);
        setTask({ title: "", description: "" });
        closeRef.current.click()
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={`#exampleModal-${status}`}>
                Launch demo modal
            </button>

            <div className="modal fade" id={`exampleModal-${status}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${status}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`exampleModalLabel-${status}`}>Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" value={task.title} onChange={handleChange} id="formGroupExampleInput" placeholder={placeholder} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
                                <textarea className="form-control" name="description" value={task.description} onChange={handleChange} id="formGroupExampleInput2" placeholder={placeholder_two}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={task.title.length < 1 || task.description.length < 1} onClick={handleSubmit}>Add note</button>
                        </div>
                    </div>
                </div>
            </div>


            
        </>
    );
}

export default TaskForm;
