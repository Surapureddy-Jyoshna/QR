// document.getElementById("teacherSignupForm")
// .addEventListener("submit", function(e){

//     e.preventDefault();

//     const inputs = document.querySelectorAll("input");
//     const select = document.querySelector("select");

//     const teacherData = {
//         name: inputs[0].value,
//         email: inputs[1].value,
//         employeeId: inputs[2].value,
//         password: inputs[3].value,
//         department: select.value
//     };

//     fetch("http://localhost:5000/teacher/signup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(teacherData)
//     })
//     .then(res => res.json())
//     .then(data => {
//         // alert(data.message);
        
//         window.location.href = "teacher_dashboard.html";
//     })
    
//     .catch(err => console.error(err));
// });
document.getElementById("teacherSignupForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const teacherData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        employeeId: document.getElementById("employeeId").value,
        password: document.getElementById("password").value,
        department: document.getElementById("department").value
    };

    try {
        const res = await fetch("http://127.0.0.1:5000/teacher/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacherData)
        });

        let data;

        if (!res.ok) {
            const text = await res.text();   // 👈 VERY IMPORTANT
            console.error("Server Error:", text);
            alert("Signup Failed! Check backend.");
            return;
        }

data = await res.json();

alert(data.message);

window.location.href = "teacher_dashboard.html";

    } catch (err) {
        console.error(err);
        alert("Error occurred!");
    }
});