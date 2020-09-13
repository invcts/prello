var sql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");
const { start } = require("repl");
var app = express();

// Establish DB Connection
var pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prello'
});


app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

app.listen(4000);
console.log("API listening to port 4000");

app.post("/login", async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    pool.getConnection( (err, connection) => {
        if (err) throw err;

        connection.query("SELECT * FROM user WHERE username = ?", [username], (err, results, fields) => {
            if (err) throw err;
            else {
                if (results[0].password === password) {
                    res.send(results[0]);
                    connection.release()
                }
                else {
                    connection.release();
                    res.status(401);
                    res.send({
                        errorCode: 401,
                        errorText: "Username und Passwort stimmen nicht überein!"
                    });
                }
            }
        });
    })
});

app.post("/createAppointment", async (req, res) => {
    var userid = req.body.userid;
    var title = req.body.title;
    var description = req.body.description;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var type = req.body.type;
    var apmntInsert = {
        title: title,
        description: description,
        startTime: startTime,
        endTime: endTime,
        type: type
    }

    pool.getConnection( (err, connection) => {
        if (err) throw err;


        connection.query("INSERT INTO appointments SET ?", apmntInsert, (error, results, fields) => {
            if (error) throw error;

            var apmntid = results.insertId;
            var uapmntInsert = {
                userID: userid,
                apmntID: apmntid
            }
            connection.query("INSERT INTO user_appointments SET ?", uapmntInsert, (error, results, fields) => {
                if (error) throw error;

                connection.release();

                res.status(202);
                res.send({
                    errorCode: 202,
                    errorText: "Datensatz eingefügt"
                });
            });
        });
    });
});

app.get("/appointments", async (req, res) => {
    var userid = req.query.user;

    pool.getConnection( (err, connection) => {
        if (err) throw err;

        connection.query(`
        SELECT app.apmntID, app.title, app.description, app.startTime, app.endTime, app.type 
        FROM appointments as app JOIN user_appointments ON user_appointments.apmntID = app.apmntID 
        WHERE user_appointments.userID = ?`, [userid], (error, results, fields) => {
            if (error) throw err;

            results.forEach((e, i) => {
                e.startTime.setHours(e.startTime.getHours() + 2);
                e.endTime.setHours(e.endTime.getHours() + 2);
            });

            connection.release();
            res.send(results);
        });
    })
});

app.post("/updateAppointment", async (req, res) => {
    pool.getConnection( (err, connection) => {
        if (err) throw err;

        connection.query(`
            UPDATE appointments SET 
            title = '${req.body.title}', 
            description = '${req.body.description}', 
            startTime = '${req.body.startTime}',
            endTime = '${req.body.endTime}',
            type = '${req.body.type}'
            WHERE apmntID = ? 
        `, [req.body.apmntid], (error, results, fields) => {
            if (error) throw error;

            connection.release();

            res.status(202);
            res.send({
                errorCode: 202,
                errorText: "Datensatz bearbeitet"
            });
        });
    });
});

app.post("/deleteAppointment", async (req, res) => {
    var apmntid = req.body.apmntid;
    var userid = req.body.userid;

    pool.getConnection( (err, connection) => {
        if (err) throw err;

        connection.query(`DELETE FROM appointments WHERE apmntID = '${apmntid}'`, (error, results, fields) => {
            if (error) throw error;

            connection.query(`DELETE FROM user_appointments WHERE userID = '${userid}' AND apmntID = '${apmntid}'`, (error, results, fields) => {
                if (error) throw error;

                connection.release();

                res.status(202);
                res.send({
                    errorCode: 202,
                    errorText: "Datensatz gelöscht"
                });
            });
        });
    });
});