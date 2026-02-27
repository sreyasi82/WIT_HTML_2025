import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import EditTask from '../EditTask/EditTask';
import Refresh from '../RefreshPage/RefreshPage';

function TodoList(){
    const [tasks, setTasks] = useState([]);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [selectedTaskData, setSelectedTaskData] = useState(null);    
    
    useEffect(()=>{
        axios.get('http://localhost:8001/todos')        
        .then((res)=>{
            console.log('successfully data fetched: ', res);
            setTasks(res.data.tasks);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
    
    //the handler that sets the specific task ID to be edited
    const HahandleEditButtonClick  = (task) => {
        console.log('Clicked row ID, rowdata:', task.id, task);
        setSelectedTaskData(task);
    };

    function deleteTask(id){
        console.log("Deleting data:", id);
        axios.delete(`http://localhost:8001/todos/${id}`)
        .then((res)=> { 
            console.log(res);
            Refresh();
        })
        .catch((err)=>console.log(err))
    }
    return(
        <div className="container-fluid" id="to-do-list">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Target Date</th>
                        <th>UserID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.map((task)=>{
                            return(<tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.description}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td>{task.target_date}</td>
                                <td>{task.user_id}</td>
                                <td>
                                    <Button 
                                        variant="outline-info" 
                                        size="sm" 
                                        onClick={()=>{                                    
                                            setModalEditOpen(true);
                                            HahandleEditButtonClick(task);
                                            }
                                        }>Edit
                                    </Button>
                                    {isModalEditOpen && <EditTask key={task.id} taskData={ selectedTaskData } open={isModalEditOpen} onCloseEditng={()=>setModalEditOpen(false)}/>}
                                </td>
                                <td><Button variant="outline-danger" size="sm" onClick={()=> deleteTask(task.id)}>Delete</Button></td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TodoList;