import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/Todos/TodoList';
import AddTask from './components/AddTask/AddTask';

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="App">
      <Header/>
      <button className='openModalBtn' onClick={()=>{setOpenModal(true);}}>
        Add Task
      </button>
      {openModal && <AddTask closeModal={setOpenModal}/>}
      <TodoList />
    </div>
  );
}

export default App;
