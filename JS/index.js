const express = require ("express");
const mysql= require('mysql');

// Create Connection
const db = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'jam'
});

// Connect 

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('My SQL Connected');
});
const app = express();


app.get('/getemployees',(req,res)=>{
    let sql = 'SELECT * FROM employee';
    let query = db.query(sql,(err,results)=>{
        if (err) throw err;
        console.log(results);
        res.send('Posts Fetched..');
    });
});

app.listen("8282",()=>{
    console.log("Server started on port 8282");
});