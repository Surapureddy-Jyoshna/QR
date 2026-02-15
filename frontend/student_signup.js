document.getElementById("studentSignupForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const studentId = document.getElementById("studentId").value;
    const password = document.getElementById("password").value;

    const studentData = {
        name,
        email,
        studentId,
        password
    };

    fetch("http://localhost:5000/student/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
})
.then(res => res.json())
.then(data => {
    localStorage.setItem("studentId", studentId);
    window.location.href = "student_dashboard.html";
})

.catch(err => {
    console.error(err);
});


    document.getElementById("message").innerText =
        "Signup Successful ✅ (Backend not connected yet)";
});
