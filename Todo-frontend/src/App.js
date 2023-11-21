
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from 'react-dnd-touch-backend';
import AllCards from "./components/AllCards/AllCards";
import Cards from "./components/Cards/Cards";
import Navbar from "./components/Navbar/Navbar";
import Topbar from "./components/Topbar/Topbar";
import TaskState from "./context/tasks/TaskState"
import MainLayout from "./layout";
// backend={HTML5Backend}

function App() {
  const backendOptions = {
    enableMouseEvents: true, // Enables mouse events alongside touch events (optional)
  };
  return (

    <>
     <TaskState>
    <DndProvider backend={TouchBackend} options={backendOptions}>
        {/* <Navbar /> */}
        <Topbar />
        <MainLayout/>
      </DndProvider>
      </TaskState>
    </>
  );
}

export default App;
