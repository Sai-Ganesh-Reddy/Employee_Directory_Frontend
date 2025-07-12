// form.js

// Get form elements
const form = document.getElementById("employeeForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const department = document.getElementById("department");
const role = document.getElementById("role");

const editId = localStorage.getItem("editId");
let isEdit = false;

// If editing, load employee data into form
if (editId) {
  const emp = employees.find(e => e.id == editId);
  if (emp) {
    isEdit = true;
    firstName.value = emp.firstName;
    lastName.value = emp.lastName;
    email.value = emp.email;
    department.value = emp.department;
    role.value = emp.role;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Basic Validation
  if (!firstName.value || !lastName.value || !email.value || !department.value || !role.value) {
    alert("All fields are required.");
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email.value)) {
    alert("Enter a valid email address.");
    return;
  }

  const newEmp = {
    id: isEdit ? parseInt(editId) : Date.now(),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    department: department.value,
    role: role.value,
  };

  if (isEdit) {
    const index = employees.findIndex(emp => emp.id == editId);
    employees[index] = newEmp;
    localStorage.removeItem("editId");
  } else {
    employees.push(newEmp);
  }

  alert("Employee saved successfully!");
  window.location.href = "index.html";
});
