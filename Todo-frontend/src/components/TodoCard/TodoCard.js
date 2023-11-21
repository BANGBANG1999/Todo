import React, { useContext, useRef, useState } from 'react'
import "./todocard.css"
import ShowCard from '../ShowCard/ShowCard'
import TaskContext from '../../context/tasks/taskContext'
import { useDrop } from 'react-dnd';
import itemTypes from '../../utils/itemTypes';


function TodoCard({ status }) {
   
    const context = useContext(TaskContext);
    const { tasks, editTask, markAsTodo } = context;
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

    const [{isOver}, drop] = useDrop({
        accept: itemTypes.CARD,
        drop: (item, monitor) => {markAsTodo(item.ID, item.title, item.description, item.status)},
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })
    

    const todoTasks = tasks.filter((task) => task.status === 'todo');

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



            <div ref={drop} className="bg-fuchsia-100 h-[11rem] flex overflow-x-scroll w-[80%]">
                {todoTasks.map((task) => {
                    return <ShowCard key={task._id} updateTask={updateTask} title={task.title} description={task.description} task={task} />
                })}

            </div>

        </>

    )
}

export default TodoCard





// // Trying react-beautiful-dnd :
// import React, { useContext, useRef, useState } from 'react';
// import "./todocard.css";
// import ShowCard from '../ShowCard/ShowCard';
// import TaskContext from '../../context/tasks/taskContext';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// function TodoCard({ status }) {
//     const context = useContext(TaskContext);
//     const { tasks, setTasks, editTask, reorderTasks } = context;
//     const [task, setTask] = useState({ etitle: "", edescription: "" });

//     const ref = useRef(null);
//     const closeRef = useRef(null);

//     const updateTask = (currentNote) => {
//         setTask({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description });
//         ref.current.click();
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         editTask(task.id, task.etitle, task.edescription, status);
//         closeRef.current.click();
//     };

//     const handleChange = (e) => {
//         setTask({ ...task, [e.target.name]: e.target.value });
//     };
//     const onDragEnd = (result) => {
//         if (!result.destination) return; // Dropped outside the list
//         const updatedOrder = Array.from(todoTasks); // Create a new array with the same tasks order
//         const [movedTask] = updatedOrder.splice(result.source.index, 1); // Remove the moved task from the source index
//         updatedOrder.splice(result.destination.index, 0, movedTask); // Insert the moved task into the destination index
//         setTasks(updatedOrder); // Update the tasks state with the reordered tasks
//         reorderTasks(updatedOrder, 'todo'); // Call the reorderTasks function with the updated order and status
//     };
    
    
    
//     const todoTasks = tasks.filter((task) => task.status === 'todo');
    

//     return (
//         <div className="todocard">
//             {/* Render the DragDropContext here */}
//             <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable droppableId={`droppable-${status}`} type="TASK">
//                     {(provided) => (
//                         <div {...provided.droppableProps} ref={provided.innerRef}>
//                             {todoTasks.map((task, index) => (
//                                 <Draggable key={task._id} draggableId={task._id} index={index}>
//                                     {(provided) => (
//                                         <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                         >
//                                             <ShowCard
//                                                 key={task._id}
//                                                 updateTask={updateTask}
//                                                 title={task.title}
//                                                 description={task.description}
//                                                 task={task}
//                                             />
//                                         </div>
//                                     )}
//                                 </Draggable>
//                             ))} 
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable>
//             </DragDropContext>

//             <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={`#exampleModal-${status}-${status}`}>
//                  Launch demo modal
//              </button>

//              <div className="modal fade" id={`exampleModal-${status}-${status}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${status}-${status}`} aria-hidden="true">
//                  <div className="modal-dialog">
//                      <div className="modal-content">
//                          <div className="modal-header">
//                              <h1 className="modal-title fs-5" id={`exampleModalLabel-${status}-${status}`}>Edit Task</h1>
//                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                          </div>
//                          <div className="modal-body">
//                              <div className="mb-3">
//                                  <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
//                                  <input type="text" className="form-control" name="etitle" value={task.etitle} onChange={handleChange} id="formGroupExampleInput" />
//                              </div>
//                            <div className="mb-3">
//                                  <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
//                                  <textarea className="form-control" name="edescription" value={task.edescription} onChange={handleChange} id="formGroupExampleInput2"></textarea>
//                              </div>                         </div>
//                          <div className="modal-footer">
//                              <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
//                              <button type="button" className="btn btn-primary" disabled={task.etitle.length < 1 || task.edescription.length < 1} onClick={handleSubmit}>Add note</button>
//                          </div>
//                      </div>
//                  </div>
//              </div>
//         </div>
//     );
// }

// export default TodoCard;

