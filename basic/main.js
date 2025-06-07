let f_name = 'tar'

let counter = 0
while (counter < 10) {
    console.log('My name is', f_name)
    counter = counter + 1
}

for (let count = 0; count < 5; count = count+1) {
    console.log('My name is', f_name)
}

// ------------------------------------------------
let ages = [30, 35, 40, 45, 50]
ages.push(55)
ages.pop()
console.log('ages list', ages)

for (let i = 0; i < ages.length; i++) {
    // console.log(ages[i])
}

// ------------------- Object -------------------
let student = [{
    age: 30,
    name: 'a',
    grade: 'A'
}, {
    age: 35,
    name: 'b',
    grade: 'B'
}]

// ------------------- function -------------------
function cal_grade (score) {
    if (score >= 80) {
        grade = 'A'
    }
    else {
        grade = 'B'
    }
    return grade
}

let cal_grade_arrow_func = (score) => {
    if (score >= 80) {
        grade = 'A'
    }
    else {
        grade = 'B'
    }
    return grade
}

console.log (cal_grade(80))

// ------------------- Parameter function -------------------
let score = [10, 20, 30]
for (i = 0; i < score.length; i++) {
    console.log('Original: ', score[i])
}
// score.forEach(function() {

// })
score.forEach((s) => {
    console.log("Original-forEach: ", s)
})

// map() = Access แต่ละตัวที่อยู่ใน array
score = score.map((s) => {
    return s * 2
})
console.log('After map: ', score)

// filter() = วนลูปและเป็น if ในตัว
let new_score = score.filter((s) => {
    if (s >= 40) {
        return true
    }
    else {
        return false
    }
})
console.log('After filter: ', new_score)

