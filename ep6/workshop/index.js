const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')

    let genderDOM = document.querySelector('input[name=gender]:checked') // ไม่ต้องวนลูป check
    let interestDOM = document.querySelectorAll('input[name=interest]:checked')

    let desDOM = document.querySelector('textarea[name=description]')


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
    const resp = await axios.post(
        'http://localhost:8000/user', 
        userData
    )

    console.log('resp data', resp.data)
}