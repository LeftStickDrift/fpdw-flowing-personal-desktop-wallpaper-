const mysql = require('mysql2'); 
const express = require('express'); 
const app = express(); 
const port = 3000; 


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "...", // Replace with your actual MySQL password
    database: "..." // replace with your img database name.
});

con.connect(err => {
    if (err) { 
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Database connection secured");

    app.get("/api/images", (req, res) => {
        con.query("SELECT * FROM wpimg_paths", (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Database query error');
                return;
            }
            res.json(results); 
        });
    });

    app.use(express.static('public'));

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});