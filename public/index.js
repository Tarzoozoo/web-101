const BASE_URL = "http://localhost:8000"

// default mode ของหน้านี้คือ mode สร้าง
let mode = 'CREATE'
let selectedId = -1

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id', id)
    if (id) {
        mode = "EDIT"
        selectedId = id
    }

    // 1) Get user เก่าออกมาก่อน
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}`)
        const user = response.data

        // 2) นำข้อมูล user กลับเข้าไปใส่ใน input html
        let firstNameDOM = document.querySelector('input[name=firstname]')
        let lastNameDOM = document.querySelector('input[name=lastname]')
        let ageDOM = document.querySelector('input[name=age]')
        let desDOM = document.querySelector('textarea[name=description]')

        firstNameDOM.value = user.firstname
        lastNameDOM.value = user.lastname
        ageDOM.value = user.age
        desDOM.value = user.description


        let genderDOMs = document.querySelectorAll('input[name=gender]')
        let interestDOM = document.querySelectorAll('input[name=interest]')

        for (let i = 0; i < genderDOMs.length; i++) {
            if (genderDOMs[i].value == user.gender) {
                genderDOMs[i].checked = true
            }
        }
        for (let i = 0; i < interestDOM.length; i++) {
            if (user.interests.includes(interestDOM[i].value)) {
                interestDOM[i].checked = true
            }
        }
    } catch (error) {
        console.log('error', error)
    }
}

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

const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')

    let genderDOM = document.querySelector('input[name=gender]:checked') || {}// ไม่ต้องวนลูป check
    let interestDOM = document.querySelectorAll('input[name=interest]:checked') || {}

    let desDOM = document.querySelector('textarea[name=description]')

    let messageDOM = document.getElementById('message')

    try {
        let interest = ''
        for (let i = 0; i < interestDOM.length; i++) {
            interest += interestDOM[i].value
            if (i != interestDOM.length - 1) {
                interest += ', '
            }
        }
        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: desDOM.value,
            interests: interest
        }
        console.log('submit data', userData)
    
        // Validate from FE
        const errors = validateData(userData)
        if (errors.length > 0) {
            // Throw error to catch
            throw {
                message: 'Required fileds incomplete',
                errors: errors
            }
        }

        let message = "Submit success"
        if (mode == "CREATE") {
            const resp = await axios.post(
                `${BASE_URL}/user`, 
                userData
            )
            console.log('response', resp.data)
        } else {
            const resp = await axios.put(
                `${BASE_URL}/user/${selectedId}`, 
                userData
            )
            message = "Edit success"
            console.log('response', resp.data)
        }
        
        messageDOM.innerText = message // เปลี่ยน text ที่อยู่ใน DOM message
        messageDOM.className = "message success" // เปลี่ยนชื่อ class
    } catch (error) {
        console.log("error resp: ", error)
        console.log("error resp: ", error.response)
        console.log("error message: ", error.message)
        console.log("error error: ", error.errors)
        
        if (error.response) {
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = "message fail"
    }
}