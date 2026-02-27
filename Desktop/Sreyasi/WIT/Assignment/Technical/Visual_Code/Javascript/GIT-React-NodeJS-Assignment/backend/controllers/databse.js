const sqlite = require('sqlite3');

const logNodeError = (error) => {
    if (error) {
      throw error;
    }
    console.log("connected to the DB");

}

const db = new sqlite.Database('./db.sqlite',sqlite.OPEN_READWRITE, logNodeError);

db.run(`CREATE TABLE IF NOT EXISTS Task (
          id INTEGER PRIMARY KEY, 
          description TEXT NOT NULL, 
          priority VARCHAR(10) NOT NULL, 
          status VARCHAR(10) NOT NULL, 
          target_date DATE, 
          user_id VARCHAR(50) 
        )`, logNodeError);

module.exports = { db, logNodeError };