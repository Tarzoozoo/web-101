// เรียกใช้ library express ด้วยคำสั่ง require
const express = require('express')
const bodyParser = require('body-parser')

// ประกาศเริ่มต้นการใช้ express
const app = express()
const port = 8000

// Parse incoming JSON data
app.use(bodyParser.json())

// เราสร้างตัวแปร users ขึ้นมาเป็น Array จำลองการเก็บข้อมูลใน Server (ซึ่งของจริงจะเป็น database)
let users = []
let counter = 1;

// สร้าง API path '/' และคืนคำ Hello world ออกมาผ่าน API
app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.json(users);
})

// Route handler for creating a new user
app.post('/user', (req, res) => {

    const data = req.body
    

    const newUser = {
        id: counter,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age
    }
    counter += 1;
    
    users.push(newUser)

    // Server ตอบกลับมาว่าเพิ่มแล้วเรียบร้อย
    res.status(201).json({ 
        message: 'User created successfully', 
        data: {
            user: newUser 
        }
    })
})

// ใช้สำหรับแก้ไข
app.put('/user/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
  
    // ค้นหาข้อมูล users
    // Check boolean condition, then return, 
    // use arrow function ดีกว่า
    let selectedIndex = users.findIndex(user => user.id == id)
  
    // อัพเดตข้อมูล users
    users[selectedIndex].firstname = data.firstname || users[selectedIndex].firstname
    users[selectedIndex].lastname = data.lastname || users[selectedIndex].lastname
    users[selectedIndex].age = data.age || users[selectedIndex].age
  
    res.json({ 
        message: 'User updated successfully', 
        data: {
            user: data,
            indexUpdated: selectedIndex
        }
    })
})

// ใช้สำหรับแก้ไข
app.patch('/user/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
  
    // ค้นหาข้อมูล users
    // Check boolean condition, then return, 
    // use arrow function ดีกว่า
    let selectedIndex = users.findIndex(user => user.id == id)
  
    // อัพเดตข้อมูล users
    if (data.firstname) {
        users[selectedIndex].firstname = data.firstname || users[selectedIndex].firstname
    }
    if (data.lastname) {
        users[selectedIndex].lastname = data.lastname || users[selectedIndex].lastname
    }
    if (data.age) {
        users[selectedIndex].age = data.age || users[selectedIndex].age
    }
  
    res.json({ 
        message: 'User updated successfully', 
        data: {
            user: data,
            indexUpdated: selectedIndex
        }
    })
})

// ใช้สำหรับลบ
app.delete('/user/:id', (req, res) => {
    const id = req.params.id

    let selectedIndex = users.findIndex(user => user.id == id)
    // pop by index
    users.splice(selectedIndex, 1)
    res.json({ 
        message: 'User deleted successfully', 
        data: {
            indexUpdated: selectedIndex
        } 
    })
})

// ประกาศ​gxbf http server ที่ port 8000 (ตามตัวแปร port)
app.listen(port, () => {
    console.log(`Example app listening on port eiei ${port}`)
})