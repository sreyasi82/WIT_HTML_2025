import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Refresh from '../RefreshPage/RefreshPage';
import {Link } from 'react-router-dom'; 
import './TodoList.css'

function TodoList(){
    const [tasks, setTasks] = useState([]);   

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
    

    function deleteTask(id){
        console.log("Deleting data:", id);
        window.alert("Are you sure that you want to delete the task?");
        axios.delete(`http://localhost:8001/todos/${id}`)
        .then((res)=> { 
            console.log(res);
            window.alert("The taskis deleted");
            Refresh();
        })
        .catch((err)=>console.log(err))
    }
    return(
        <div className="container" id="to-do-list">
            <Table striped bordered hover>
                <thead className="bg-success">
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Target Date</th>
                        <th>UserID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.map((task, index)=>{
                            return(<tr key={index}>
                                <td>{task.id}</td>
                                <td>{task.description}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td>{task.target_date}</td>
                                <td>{task.user_id}</td>
                                <td>
                                    <Link to={`/todos/${task.id}`} className='btn btn-sm btn-success'>Show</Link>
                                    <Link to={`/update/${task.id}`} className='btn btn-sm btn-info'>Edit</Link> 
                                    <Button variant="danger" size="sm" onClick={()=> deleteTask(task.id)}>Delete</Button>
                                </td>
                            </tr>
                            )
                        })
                    }                             
                    
                </tbody>                  
            </Table>
            <div className='footer'>
                <Link to={`/`} className='btn btn-sm btn-info'>Close</Link>
            </div>
        </div>
    )
}

export default TodoList;