const BASE_URL = "https://qr-1-jep5.onrender.com";
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
        const res = await fetch(`${BASE_URL}/teacher/signup`, {
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