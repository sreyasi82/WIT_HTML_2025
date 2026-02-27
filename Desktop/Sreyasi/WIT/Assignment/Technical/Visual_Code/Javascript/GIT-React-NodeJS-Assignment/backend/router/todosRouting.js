/***********************************************************************************************************************/
/* This file is for routing GET, POST, PUT, DELETE requests for TODO tasks                                                  */
/***********************************************************************************************************************/

var express = require("express");
var todosRouter = express.Router();

// Import DB module and access the DB functions
const { readFromDb,readFromDbById,writeToDb,updateDbById,deleteFromDbById } = require("../controllers/dbHandling");


// Todo Endpoints
// a. handle request "GET /todos" - Retrieve all tasks.
todosRouter.get("/", (req, res)=> {
    console.log("Routing from todosRouting"); 
    //call DB function to fetch data from Task table
    let data = readFromDb(req, res);
    if(data){
        console.log("successfully task data fetched from todosRouting.js ");
    }
    else{
        console.log(`Nothing is retrieved!`); 
        res.status(404).send("GET Route from todosRouting.js failed");      
    }     
});

todosRouter.get("/:id", (req, res)=> {
    console.log("Routing from todo-router"); 
    //call DB function to fetch data from task table
    let data = readFromDbById(req, res);
    if(data){
        console.log("successfully task fetched from todosRouting.js ");
    }
    else{
        console.log(`Nothing is retrieved!`); 
        res.status(404).send("GET Route from todosRouting.js failed");      
    }     
});

// b. handle request "POST /todos" - Add a new task.
todosRouter.post("/", (req, res)=>{    
    if(req.body){
        console.log(req.body);
        //call DB function to write into the task node
        writeToDb(req, res);       

    }else{
        console.log("No data available to send");
        res.status(404).send("Failed to post todos");
    }
});

// c. handle request  "PUT /todos/:id" - Update an existing todos by ID.
todosRouter.put("/:id", (req, res)=>{
    console.log("Routing from todosRouting");
    if(req.body){        
        if(req.params.id){
            console.log(`Id sent from browser:${req.params.id}`);
            //update the db for recieved id
            updateDbById(req, res);      
        }
        else{
            console.log(`Id sent from browser was not correct`)
            res.status(404).send(`Id sent from browser was not correct`);
        }
    }else{
        console.log(`no data provided to update`)
        res.status(404).send(`no data provided to update`);
    }
});

// d. handle request "DELETE /todos/:id" - Delete a task by ID.
todosRouter.delete('/:id', (req, res)=> {
    if(req.params.id){
        deleteFromDbById(req, res);                
    }
    else{
        console.log(`Id sent from browser was not correct`)
        res.status(404).send(`Id sent from browser was not correct`);
    }
    
})

//expost the router module
module.exports = todosRouter;