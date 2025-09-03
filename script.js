const loginContainer = document.getElementById("loginContainer");
const loginForm = document.getElementById("loginForm");
const app = document.getElementById("app");

const USERNAME = "welcome";
const PASSWORD = "1234";

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === USERNAME && password === PASSWORD) {
        alert("Login successful!");
        loginContainer.style.display = "none";
        app.style.display = "block";
    } else {
        alert("Invalid username or password!");
    }
});

// Elements
const formContainer = document.getElementById("formContainer");
const regForm = document.getElementById("regForm");
const addBtn = document.getElementById("addBtn");
const recordBtn = document.getElementById("recordBtn");
const backBtn = document.getElementById("backBtn");
const studentTable = document.querySelector(".table-striped tbody");
const studentCount = document.getElementById("studentCount");
const studentIndexField = document.getElementById("studentIndex");
const studentSection = document.getElementById("studentSection");
const viewContainer = document.getElementById("viewContainer");
const viewDetails = document.getElementById("viewDetails");
const closeViewBtn = document.getElementById("closeViewBtn");

// Data store
let students = [];

// Show form only
addBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
    studentSection.style.display = "none";
    viewContainer.style.display = "none";
    regForm.reset();
    studentIndexField.value = "";
});

// Show records only
recordBtn.addEventListener("click", () => {
    studentSection.style.display = "block";
    formContainer.style.display = "none";
    viewContainer.style.display = "none";
    renderTable();
});

// Submit form
regForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const college = document.getElementById("college").value;
    const age = document.getElementById("age").value;
    const mobile = document.getElementById("mobile").value;
    const course = document.getElementById("course").value;

    const index = studentIndexField.value;

    if (index === "") {
        students.push({ name, college, age, mobile, course });
        alert("Form submitted successfully!");
    } else {
        students[index] = { name, college, age, mobile, course };
        alert("Student updated successfully!");
    }

    renderTable();
    formContainer.style.display = "none";
});

// Back button hides form
backBtn.addEventListener("click", () => {
    regForm.reset();
    formContainer.style.display = "none";
});

// Render students in table
function renderTable() {
    studentTable.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.college}</td>
      <td>${student.age}</td>
      <td>${student.mobile}</td>
      <td>${student.course}</td>
      <td>
        <button class="action-btn view-btn" onclick="viewStudent(${index})">View</button>
        <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
        studentTable.appendChild(row);
    });
    studentCount.textContent = students.length;
}

// View student in center page
window.viewStudent = function (index) {
    const s = students[index];
    viewDetails.innerHTML = `
    <p><strong>Name:</strong> ${s.name}</p>
    <p><strong>College-Name:</strong> ${s.college}</p>
    <p><strong>Age:</strong> ${s.age}</p>
    <p><strong>Mobile:</strong> ${s.mobile}</p>
    <p><strong>Course:</strong> ${s.course}</p>
  `;

    formContainer.style.display = "none";
    studentSection.style.display = "none";
    viewContainer.style.display = "block";
};

// Close view page → go back to records
closeViewBtn.addEventListener("click", () => {
    viewContainer.style.display = "none";
    studentSection.style.display = "block";
});

// Edit student
window.editStudent = function (index) {
    const s = students[index];
    document.getElementById("name").value = s.name;
    document.getElementById("college").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("mobile").value = s.mobile;
    document.getElementById("course").value = s.course;
    studentIndexField.value = index;

    formContainer.style.display = "block";
    studentSection.style.display = "none";
    viewContainer.style.display = "none";
};

// Delete student
window.deleteStudent = function (index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        renderTable();
    }
};
