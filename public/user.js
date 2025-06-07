const BASE_URL = "http://localhost:8000"

window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    console.log('On load')
    // 1) โหลด user ทั้งหมด
    const response = await axios.get(`${BASE_URL}/user`)

    console.log(response.data)

    // 2) นำ response เข้าไปใน html
    const userDOM = document.getElementById("user")

    let userHTMLData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i]
        userHTMLData += `<div>
            ${user.id} ${user.firstname} ${user.lastname}
            <a href="index.html?id=${user.id}"><button>Edit</button>
            <button class='delete' data-id='${user.id}'>Delete</button>
        </div>`
    }

    userHTMLData += "</div>"
    userDOM.innerHTML = userHTMLData

    // Delete button action
    const deleteDOMs = document.getElementsByClassName("delete")
    for  (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener("click", async (event) => {
            // Get ID
            // event.target = self
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/user/${id}`)
                loadData() // Recursive func. = การเรียก func. ตัวเอง
            } catch (error) {
                console.log("error", error)
            }
        })
    }
}