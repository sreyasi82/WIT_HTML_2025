import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './TodoItem.css'

function TodoItem(){
    const [values, setValues] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        console.log("Fetching data for id:", id);
        axios.get(`http://localhost:8001/todos/${id}`)
        .then((res)=> { 
            setValues(res.data.tasks[0]);
        })
        .catch((err)=>console.log(err))
    },[id]);
   
    return(
        <div className="todoItem_form">
                <div className='title'>
                    <h3>Task Detail:</h3>
                </div>  
                <div>
                    <label htmlFor="description">Description: </label>
                    <span>{values.description}</span>
                </div>
                <div >
                    <label htmlFor="priority">Priority:</label>  
                    <span>{values.priority}</span>                  
                </div>
                <div >
                    <label htmlFor="status">Status:</label> 
                    <span>{values.status}</span>                   
                </div>
                <div >
                    <label htmlFor="target_date">Target Date:</label>
                    <span>{values.target_date}</span>
                </div>
                <div class='mb-3'>
                    <label htmlFor="user_id">Asignee:</label>
                    <span>{values.user_id}</span>
                </div>
            <div class='mb-3'>
                <Link to={`/update/${values.id}`} className='btn btn-sm btn-info'>Update</Link>                                
                <Link to={`/todos/`} className='btn btn-sm btn-danger'>Close</Link>                                
                                
            </div>
        </div>
    )

}


export default TodoItem;