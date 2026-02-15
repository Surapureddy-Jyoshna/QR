document.getElementById("teacherSignupForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const inputs = document.querySelectorAll("input");
    const select = document.querySelector("select");

    const teacherData = {
        name: inputs[0].value,
        email: inputs[1].value,
        employeeId: inputs[2].value,
        password: inputs[3].value,
        department: select.value
    };

    fetch("http://localhost:5000/teacher/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teacherData)
    })
    .then(res => res.json())
    .then(data => {
        // alert(data.message);
        
        window.location.href = "teacher_dashboard.html";
    })
    
    .catch(err => console.error(err));
});
