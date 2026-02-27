import React, { useState } from 'react';
import axios from 'axios';
import Refresh from '../RefreshPage/RefreshPage';
//import { Link, useNavigate } from 'react-router-dom';

function AddTask({ closeModal }){
    const [values, setValues] = useState({
        description: '',
        priority: '',
        status: '',
        target_date: '',
        user_id:''
    })

    function handleSubmit(e){
        e.preventDefault();
        console.log("inserting data:", values);
        axios.post('http://localhost:8001/todos', values)
        .then((res)=> { 
            console.log(res);
            closeModal(false);
            Refresh();
        })
        .catch((err)=>console.log(err))
    }
    return(
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className="row">
                    <div className='title'>
                        <h3>Add Task</h3>
                    </div>                    
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type='text' name='description' onChange={(e) => setValues({...values, description: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="priority">Priority</label>
                            <select id='priority' name='priority' onChange={(e) => setValues({...values, priority: e.target.value})}>
                                <option value="">-- Select an option --</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status">Status</label>
                            <select id='status' name='status' onChange={(e) => setValues({...values, status: e.target.value})}>                                
                                <option value="">-- Select an option --</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="inProgress">In progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="target_date">Target Date</label>
                            <input type='date' name='target_date' onChange={(e) => setValues({...values, target_date: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="user_id">Asignee</label>
                            <input type='text' name='user_id' onChange={(e) => setValues({...values, user_id: e.target.value})}/>
                        </div>
                        <div className='footer'>
                            <button type='submit'>Add</button>
                            <button onClick={()=> closeModal(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTask;