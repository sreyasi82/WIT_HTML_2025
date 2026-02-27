import { useState, useEffect } from 'react';
import axios from 'axios';
import Refresh from '../RefreshPage/RefreshPage';

function EditTask({ taskData, open, onCloseEditng }){  
    console.log(taskData, open);

    const [editedTask, setEditedTask] = useState({        
        description: '',
        priority: '',
        status: '',
        target_date: '',
        user_id:''
    });

    useEffect(()=>{
        console.log("fetching data for id:", taskData);
        setEditedTask(taskData);        
    }, [taskData])

    function handleSubmit(e){
        e.preventDefault();
        console.log("inserting data:", editedTask);
        axios.post(`http://localhost:8001/todos/${editedTask.id}`, editedTask)
        .then((res)=> { 
            console.log(res);
            onCloseEditng(false);
            Refresh();
        })
        .catch((err)=>console.log(err))
    }
    
    if(!open) 
        return null;
    else{
        return(
                <div className='modalBackground'>
                    <div className='modalContainer'>
                        <div className="row">
                            <div className='title'>
                                <h3>Update Task</h3>
                            </div>                    
                            <form onSubmit={handleSubmit} >
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <input value={editedTask.description} type='text' name='description' onChange={(e) => setEditedTask([{...editedTask, description: e.target.value}])}/>
                                </div>
                                <div>
                                    <label htmlFor="priority">Priority</label>
                                    <select id='priority' name='priority' value={editedTask.priority} onChange={(e) => setEditedTask([{...editedTask, priority: e.target.value}])}>
                                        <option value="">-- Select an option --</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="status">Status</label>
                                    <select id='status' name='status' value={editedTask.status} onChange={(e) => setEditedTask([{...editedTask, status: e.target.value}])}>                                
                                        <option value="">-- Select an option --</option>
                                        <option value="scheduled">Scheduled</option>
                                        <option value="inProgress">In progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="target_date">Target Date</label>
                                    <input type='date' name='target_date' value={editedTask.target_date} onChange={(e) => setEditedTask([{...editedTask, target_date: e.target.value}])}/>
                                </div>
                                <div>
                                    <label htmlFor="user_id">Asignee</label>
                                    <input type='text' name='user_id' value={editedTask.user_id} onChange={(e) => setEditedTask([{...editedTask, user_id: e.target.value}])}/>
                                </div>
                                <div className='footer'>
                                    <button type='submit' >Update</button>
                                    <button onClick={onCloseEditng}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

export default EditTask;