import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './GetTaskId.css'

const GetTaskId = ({ action, closeModal }) => {
    const [taskId, setTaskId] = useState(null);
    const navigate = useNavigate(); 

    return (
        <>               
          <div className='get_id_field'>
              <label htmlFor="task_id">Enter Task id:</label>
              <input type='text' id='task_id' name='task_id' 
                      onChange={(e) => {setTaskId(e.target.value); 
                                        console.log(taskId);
                                        ;}}/>
              <button className='btn btn-sm btn-success' 
                      onClick={(e)=>{
                          e.preventDefault();
                          closeModal(false);
                          try{
                            navigate(`/${action}/${taskId}`);
                          }
                          catch(err){
                            console.log(err);
                          }                                                  
                        } 
                      }>OK</button>
          </div>
    </>
        
  );
};

export default GetTaskId;