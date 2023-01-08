const express = require('express');
const mysql = require('mysql2');
const app = express();

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'mysql'
  });

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
});

// GET ALL USERS
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, rows) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
        return;
        }
        console.log(rows)
        res.send(rows);
    });
});

//ADD A USER
app.post('/users', (req, res) => {
  const user = req.body;
  const sql = 'INSERT INTO users (first_name, last_name, address, postcode, phone, email, uname, pass) VALUES (?)';
  connection.query(sql, [[user.first_name, user.last_name, user.address, user.postcode, user.phone, user.email, user.uname, user.pass]], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating new user');
      return;
    }
    res.send({ id: result.insertId });
  });
});

//EDIT USER
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = req.body;
  const sql = 'UPDATE users SET ? WHERE id = ?';
  connection.query(sql, [user, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating user');
      return;
    }
    res.send({ affectedRows: result.affectedRows });
  });
});

//DELETE A USER OR MULTIPLE USERS
app.delete('/users', (req, res) => {
  const userIds = req.body;
  const placeholders = userIds.map(() => '?').join(',');
  const sql = `DELETE FROM users WHERE id IN (${placeholders})`;
  connection.query(sql, userIds, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting users');
      return;
    }
    res.send({ affectedRows: result.affectedRows });
  });
});

