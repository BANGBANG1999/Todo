import { useState, useEffect } from "react";
import TaskContext from "./taskContext";

const TaskState = (props) => {
  const host = "http://localhost:5000"
  const initialTask = []

  const [tasks, setTasks] = useState(initialTask);

  

  useEffect(() => {
    // Fetch tasks and their order when the component mounts
    getTasks();
   
  }, []);
    

//Saving the task if dragged to doing
  const markAsDoing = (id, title, description) => {
    const draggedItem = tasks.find((task) => task._id === id);
    if (draggedItem && draggedItem.status !== 'doing') {
        // Update the status locally first 
        draggedItem.status = 'doing';
        // Then make an API call to save the updated task status
        editTask(id, draggedItem.title, draggedItem.description, 'doing');
        //We dont need this:
        // saveTask(id, title, description, 'doing');
        
    }
};

//Saving the task if dragged to todo
const markAsTodo = (id, title, description) => {
    const draggedItem = tasks.find((task) => task._id === id);
    if (draggedItem && draggedItem.status !== 'todo') {
        // Update the status locally first (optimistic update)
        draggedItem.status = 'todo';
        editTask(id, draggedItem.title, draggedItem.description, 'todo');
        // Then make an API call to save the updated task status
        // saveTask(id, title, description, 'todo');
        
    }
};

//Saving the task if dragged to done
const markAsDone = (id, title, description) => {
    const draggedItem = tasks.find((task) => task._id === id);
    if (draggedItem && draggedItem.status !== 'done') {
        // Update the status locally first (optimistic update)
        draggedItem.status = 'done';
        editTask(id, draggedItem.title, draggedItem.description, 'done');
        // Then make an API call to save the updated task status
        // saveTask(id, title, description, 'done');
        
    }
};


// We dont need this function as we are already calling editTasks function in markAsDoing, markAsTodo, and markAsDone
//API call to save dragged task
// const saveTask = async (taskId, title, description, status) => {
//       const response = await fetch(`/api/task/updatetask/${taskId}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ title, description, status }),
//       });

//       if (response.ok) {
//           const updatedTask = await response.json();
//           setTasks(updatedTask)
//       }
  
// };
  

  // Get all notes
  const getTasks = async () => {
    //API call
    const response = await fetch(`${host}/api/task/fetchalltasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const json = await response.json()

    setTasks(json)
    
  }





  //Add a note to todo 
  const addTask = async (title, description, status) => {
    //API call
    const response = await fetch(`${host}/api/task/createtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status }),
    });
    const task = await response.json()
    setTasks(tasks.concat(task))
  }




  //Delete a note
  const deleteTask = async (id) => {
    //TODO: API call
    const response = await fetch(`${host}/api/task/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json()

    const newTasks = tasks.filter((task) => { return task._id !== id })
    setTasks(newTasks)
  }

  //Edit a task
  const editTask = async (id, title, description, status) => {
    //API call
    const response = await fetch(`${host}/api/task/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status }),
    });

    const json = response.json();

    //Logic to update note
    const newTasks = JSON.parse(JSON.stringify(tasks))
    for (let index = 0; index < newTasks.length; index++) {
      let element = newTasks[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.status = status
        break;
      }
    }
    setTasks(newTasks)
  }


  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, getTasks, deleteTask, editTask, markAsDoing, markAsTodo, markAsDone}}>
      {props.children}
    </TaskContext.Provider>
  )
}
export default TaskState



