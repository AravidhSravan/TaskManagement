const mysql = require("mysql");
const express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "mysql123",
    database: "taskdb"
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection Established");
    }
    else {
        console.log("Connection not Established" + JSON.stringify(err, undefined, 2));
    }
})

app.listen(3003, () => console.log("server up and running"));

app.get('/alltasks', (req, res) => {
    mysqlConnection.query('SELECT * FROM tasktable', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("DATA PRESENT");
        }
        else {
            console.log("No data")
        }
    })
});



app.delete('/deletetask/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM tasktable where taskId = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Record Deleted');
            console.log("Record Deleted");
        }
        else {
            console.log("No data")
        }
    })
});


app.post('/saveTask', (req, res) => {
    var postData = req.body;
    mysqlConnection.query('INSERT INTO tasktable SET ?', postData, (err, result, fields) => {
        if (!err) {
            res.send(JSON.stringify(result));
            console.log("Record saved");
        }
        else {
            console.log("No data")
        }
    })
});


app.get('/getTask/:name', (req, res) => {
    mysqlConnection.query('SELECT * FROM tasktable where taskholdername = ?', [req.params.name], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("DATA PRESENT");
        }
        else {
            console.log("No data")
        }
    })
});

app.put('/changeStatus/:id', (req, res) => {
    var postData = req.body;
    mysqlConnection.query('UPDATE tasktable SET ? where `taskId`=?', [postData, req.params.id], (err, result, fields) => {
        if (!err) {
            res.send(JSON.stringify(result));
            console.log("Record updated")
        }
        else {
            console.log("No data")
        }
    })
});