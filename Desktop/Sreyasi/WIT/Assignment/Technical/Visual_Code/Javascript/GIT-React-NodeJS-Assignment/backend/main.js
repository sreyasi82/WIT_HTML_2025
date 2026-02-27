/***********************************************************************************************************************/
/* This file is main file to start processing  all type of  requests for todos                                         */
/***********************************************************************************************************************/

let express = require("express");
let path = require("path");
const cors = require("cors");
let todoRouter = require("./router/todosRouting");
let app = express();
//to read static htmlpage with proper path name
app.use(express.static(path.join (__dirname, "public")));
//use JSON for send-recieve data
app.use(express.json());
//middleware
app.use(cors({
  origin: "http://localhost:3000",
}));

let intro_text = "Welcome to REACT-NODEJS based Todo app project. Following are the available end points: todos/ "

//routing the requests for todos routers
app.use('/todos', todoRouter);


//starting with 'GET /' request
app.get("/", (req, res, next)=>{
    console.log("Welcome to RESTAPI-NODE-Prject");
    //Should show some text when html page is missing 
    res.status(200).send(intro_text);
})

// export app for use in server.js and for all routers
module.exports = {
  app
};