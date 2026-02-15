window.onload = function(){

    const form = document.getElementById("studentLoginForm");

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const studentId = document.getElementById("studentId").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:5000/student/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentId, password })
        })
        .then(res => res.json())
        .then(data => {

            if(data.message === "Login Successful"){
                localStorage.setItem("studentId", studentId);
                window.location.href = "student_dashboard.html";
            } else {
                document.getElementById("message").innerText = data.message;
            }

        })
        .catch(err => console.error(err));
    });

};
