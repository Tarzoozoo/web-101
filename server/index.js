// เรียกใช้ library express ด้วยคำสั่ง require
const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg');
const cors = require('cors')
const path = require('path');

// ประกาศเริ่มต้นการใช้ express
const app = express()
const port = 8000


// Parse incoming JSON data
app.use(bodyParser.json())
app.use(cors())

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// เราสร้างตัวแปร users ขึ้นมาเป็น Array จำลองการเก็บข้อมูลใน Server (ซึ่งของจริงจะเป็น database)
let users = []
let counter = 1;

const pool = new Pool({
    host: 'localhost',
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    port: 5433, // default PostgreSQL port
});

const validateData = (userData) => {
  let errors = []
  if (!userData.firstname) {
      errors.push('Please insert firstname')
  }
  if (!userData.lastname) {
      errors.push('Please insert lastname')
  }
  if (!userData.age) {
  errors.push('Please insert age')
  }
  if (!userData.description) {
  errors.push('Please insert description')
  }
  if (!userData.interests) {
  errors.push('Please insert interests')
  }
  return errors
}

// Using Promise method
app.get('/test-db-promise', (req, res) => {
    pool.query('SELECT * FROM users')
    .then((result) => {
      res.json(result.rows)  // PostgreSQL returns rows in `rows`
    })
    .catch((error) => {
      console.error('Error fetching users:', error.message)
      res.status(500).json({ error: 'Error fetching users' })
    })
})

// Using Async/Await method (Recommend) !!!
app.get('/test-db-async', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users')
      res.json(result.rows) // rows contains the data
    } catch (error) {
      console.error('Error fetching users:', error.message)
      res.status(500).json({ error: 'Error fetching users' })
    }
  })

// GET /user สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/user', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows) // rows contains the data
  } catch (error) {
    console.error('Error fetching users:', error.message)
    res.status(500).json({ error: 'Error fetching users' })
  }
})

// POST /user สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/user', async (req, res) => {
  let user = req.body;
  try {
    const errors = validateData(user)
    if (errors.length > 0) {
      throw {
        message: 'กรอกข้อมูลไม่ครบ',
        errors: errors
      }
    }

    const result = await pool.query(
      `INSERT INTO users (firstname, lastname, age, interests, description, gender)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`, // Return inserted row
      [user.firstname, user.lastname, user.age, user.interests, user.description, user.gender]
    );
    res.json({
      message: "Insert success",
      data: result.rows[0]
    }
      
    ) // rows contains the data
  } catch (error) {
    const errorMessage = error.message || 'something wrong'
    const errors = error.errors || []
    res.status(500).json({
      message: errorMessage,
      errors: errors 
    })
  }
})

// GET /user by id
app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
      );
    if (result.rows.length == 0) {
      throw { statusCode: 404, message: 'user not found'}
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error message:', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json(
      { message: 'Error fetching users',
        data: error.message
       })
  }
})

// Update users by id
app.put('/user/:id', async (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, age, interests, 
  description, gender } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users
       SET firstname = $1,
           lastname = $2,
           age = $3,
           interests = $4,
           description = $5,
           gender = $6
       WHERE id = $7
       RETURNING *`,
      [firstname, lastname, age, interests, description, gender, id]
    );
    res.json({
      message: "Update success",
      data: result.rows[0]
    }) // rows contains the data
  } catch (error) {
    console.error('Error update users:', error.message)
    res.status(500).json({ error: 'Error update users' })
  }
})

// Delete users by id
app.delete('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1`,
      [id]
      );
    res.json({
      message: "Delete success",
      data: result.rows[0]
    }) // rows contains the data
  } catch (error) {
    console.error('Error message:', error.message)
    res.status(500).json(
      { message: 'Error delete users'
       })
  }
})

// GET health check
app.get('/', (req, res) => {
  res.send("Mockup App")
})

// ประกาศ​gxbf http server ที่ port 8000 (ตามตัวแปร port)
app.listen(port, () => {
    console.log(`Example app listening on port eiei ${port}`)
})