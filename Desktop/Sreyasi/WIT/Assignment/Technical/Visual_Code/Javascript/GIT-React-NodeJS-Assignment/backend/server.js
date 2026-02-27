/***********************************************************************************************************************/
/* This file is entry point to start this REST API app. It mainly starts listening to the port available               */
/***********************************************************************************************************************/

const {app} = require("./main");
//exports .env file for initial configurations
require('dotenv').config();


//assign the port number read from env file else set to default value 3001
const PORT =  process.env.PORT || 3001;


//start listenning to the port
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Server did not start succesfully: ', err);
  }
  console.log(`This app is listening on port ${PORT}`)
})
