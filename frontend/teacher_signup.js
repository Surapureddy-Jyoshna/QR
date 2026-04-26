const BASE_URL = "https://qr-1-jep5.onrender.com";
document.getElementById("teacherSignupForm")
.addEventListener("submit", async function(e){

  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const employeeId = document.getElementById("employeeId").value;
  const password = document.getElementById("password").value;
  const department = document.getElementById("department").value;

  try{

    const res = await fetch(`${BASE_URL}/teacher/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        employeeId,
        password,
        department
      })
    });

    const data = await res.json();

    if(!data.success){
      alert(data.message || "Signup failed");
      return;
    }

    // ✅ SAVE TOKEN
    localStorage.setItem("token", data.token);

    // ✅ REDIRECT TO DASHBOARD
    window.location.href = "teacher_dashboard.html";

  }catch(err){
    console.error(err);
    alert("Server error");
  }

});