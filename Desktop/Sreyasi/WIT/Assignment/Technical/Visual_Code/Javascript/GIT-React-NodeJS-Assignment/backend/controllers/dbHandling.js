/**************************************************************************************************************************/
/* This file is for function that handles to read, write, update and delete operation on Firebase database via FB APIs    */
/**************************************************************************************************************************/
// import db configs  
// import sqlite3  


// creating a database file
const { db, logNodeError } = require('./databse');


/**********************************************/
/* Function name: readFromDb                  */
/* parameter: 1) req - request parameter used */
/*              in http GET request           */
/*           2) res - response parameter used */
/*              in http GET request           */
/*Description: This function is invoked when  */
/*                                            */
/*           GET(/todos) requests are handled*/
/**********************************************/
const  readFromDb = async(req, res)=> {
    console.log("fetch all data for the Task table ");
    task_id = req.param_id;
    console.log("task_id:",task_id);
    let data = {tasks: []};
    //res.set('content-type', 'application/json')
    // Selects a table named Task and returns the rows the has the users 
    try{
        //db.all(`SELECT * FROM Task WHERE user_id = ${user_id}`, [], (err, rows) => {
        db.all(`SELECT * FROM Task`, [], (err, rows) => {
            if(err){
                throw err;
            }
            rows.forEach((row)=>{
                data.tasks.push({id: row.id, 
                    description: row.description, 
                    priority: row.priority, 
                    status: row.status, 
                    target_date: row.target_date, 
                    user_id: row.user_id});
            });
            let reply_data = JSON.stringify(data);
            console.log(reply_data);
            res.status(200).send(reply_data);
        });
    }
    catch(err){
            console.log(err);
            //467 - indicates problem with the data fetching
            res.status(467).send('Facing problem with the data fetching');
            
        }
}
/**********************************************/
/* Function name: readFromDbById              */
/* parameter: 1) req - request parameter used */
/*              in http GET request           */
/*           2) res - response parameter used */
/*              in http GET request           */
/*Description: This function is invoked when  */
/*                                            */
/*           GET(/todos) requests are handled*/
/**********************************************/
const  readFromDbById = async(req, res)=> {
    console.log("fetch data with following id from the Task table ");
    task_id = req.params.id;
    console.log("task_id:",task_id);
    let data = {tasks: []};
    //res.set('content-type', 'application/json')
    // Selects a table named Task and returns the rows the has the users 
    try{  
        db.get(`SELECT * FROM Task WHERE id = ?`, [task_id], (err, row) => {
            if(err){
                throw err;
            }
            console.log(row);
            data.tasks.push({
                id: row.id, 
                description: row.description, 
                priority: row.priority, 
                status: row.status, 
                target_date: row.target_date, 
                user_id: row.user_id
            });
            
            let reply_data = JSON.stringify(data);
            console.log(reply_data);
            res.status(200).send(reply_data);
        });
    }
    catch(err){
            console.log(err);
            //467 - indicates problem with the data fetching
            res.status(467).send('Facing problem with the data fetching');            
        }
}

/**********************************************/
/* Function name: writeToDb                   */
/*                                            */
/* parameter: 1) req - request parameter used */
/*              in http POST request          */
/*           2) res - response parameter used */
/*              in http POST request          */
/*                                            */
/*Description: This function is invoked when  */
/*           POST(/todos) requests are handled*/
/*                                            */
/**********************************************/
const  writeToDb = (req, res)=> {    
    console.log("Trying to write/push new task to the database");
    console.log(req.body);
    //res.set('content-type', 'application/json')
    //const sql = `INSERT INTO task VALUES(?, 'submit assignment', 'Normal', 'scheduled', '02/23/26', 'sreyasi11')`;
    const sql = `INSERT INTO task VALUES(?, ?, ?, ?, ?, ?)`;
   
    try{
        let newId ;   
        db.run(sql,[newId, req.body.description, req.body.priority, req.body.status, req.body.target_date, req.body.user_id], function(err){
            if(err){
                res.status(468).send('Id or the data format is not correct...please check');
                throw err;
            }

            newId = this.lastID;//provide auto-increment to id     
            let data = {status:201, message:`New task with id ${newId} inserted.`};
            let content = JSON.stringify(data);
            res.send(content);
        });     

    }
    catch(err){
        console.log(err);
        //468 - indicates problem with the data insertion
        res.status(468).send('Facing problem with the data insertion');
    }
}


/**********************************************/
/* Function name: updateDbById                */
/*                                            */
/* parameter: 1) node_name- determines to     */
/*           which node(users, income,expense)*/
/*           in firebase rdbm data has to be  */
/*           updated.                         */
/*           2) req - request parameter popu- */
/*           lated by http PUT request        */
/*                                            */
/*Description: This function is invoked when  */
/*           PUT(/users/:id, /income/:id OR   */
/*           /expense/:id) requests are       */
/*           handled.                         */
/*                                            */
/**********************************************/

const updateDbById = async ( req, res) => {       
    console.log("Updating existing task to the database");
    console.log(req.body);
    task_id = req.params.id;
    console.log("task_id:",task_id);

    const sql = `UPDATE task SET
                    id = ?,
                    description = ?,
                    priority = ?,
                    status = ?,
                    target_date = ?,
                    user_id = ?
                    WHERE id = ?`;
   
    try{          
        db.run(sql,[task_id, req.body.description, req.body.priority, req.body.status, req.body.target_date, req.body.user_id, task_id], function(err){
            if(err)
                throw err;                
            let data = {status:201, message:`Task with id ${task_id} updated.`};
            let content = JSON.stringify(data);
            res.send(content);
        });     

    }
    catch(err){
        console.log(err);
        //468 - indicates problem with the data insertion
        res.status(468).send('Facing problem with the data insertion');
    }
}

/**********************************************/
/* Function name: deleteFromDbById            */
/*                                            */
/* parameter: 1) node_name- determines from   */
/*           which node(users, income,expense)*/
/*           in firebase rdbm data has to be  */
/*           delected.                        */
/*           2) req - request parameter that  */
/*           consists id from http DELETE     */
/*           requests                         */
/*                                            */
/*Description: This function is invoked when  */
/*           DELETE(/users/:id, /income/:id   */
/*           OR /expense/:id) requests are    */
/*           handled.                         */
/*                                            */
/**********************************************/
const deleteFromDbById = async (req, res) =>{    
    console.log("Trying to delete task having the specific id from the table");
    console.log(req.params.id);

    const sql = `DELETE FROM task WHERE id = ?`;
   
    try{
        let status, data ;   
        db.run(sql,[req.params.id], function(err){
            if(err)
                throw err;

            status = this.changes;//provide auto-increment to id    
            console.log(status);
            if(status === 1){
                data = {status:201, message:`The task with id ${req.params.id} deleted.`};                
            }
            else{
                data = {status:404, message:`The task with id ${req.params.id} not found.`};
                
            }
            let content = JSON.stringify(data);
            res.status(data.status).send(content);
        });     

    }
    catch(err){
        console.log(err);
        //468 - indicates problem with the data insertion
        res.status(468).send('Facing problem with the data insertion');
    }
}

//export the functions
module.exports = {
  readFromDb,
  readFromDbById,
  writeToDb,
  updateDbById,
  deleteFromDbById
};