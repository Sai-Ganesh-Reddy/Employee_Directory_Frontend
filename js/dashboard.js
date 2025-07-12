let filteredList = [...employees];
let currentPage = 1;

const searchInput = document.getElementById("searchInput");
const sortBy = document.getElementById("sortBy");
const pageSize = document.getElementById("pageSize");
const filterDept = document.getElementById("filterDept");
const filterRole = document.getElementById("filterRole");

function applyAllFilters() {
  const keyword = searchInput.value.toLowerCase();
  const selectedDept = filterDept.value;
  const selectedRole = filterRole.value;
  const sortField = sortBy.value;

  // Filter
  filteredList = employees.filter(emp => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(keyword) ||
      emp.lastName.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword);
    const matchesDept = selectedDept === "" || emp.department === selectedDept;
    const matchesRole = selectedRole === "" || emp.role === selectedRole;

    return matchesSearch && matchesDept && matchesRole;
  });

  // Sort
  if (sortField) {
    filteredList.sort((a, b) => a[sortField].localeCompare(b[sortField]));
  }

  currentPage = 1; // Reset to page 1
  renderPaginatedList();
}

function renderPaginatedList() {
  const size = parseInt(pageSize.value);
  const start = (currentPage - 1) * size;
  const end = start + size;
  const currentItems = filteredList.slice(start, end);
  renderEmployees(currentItems);
  renderPaginationButtons();
}

function renderPaginationButtons() {
  const container = document.getElementById("paginationControls") || createPaginationDiv();
  container.innerHTML = "";

  const totalPages = Math.ceil(filteredList.length / parseInt(pageSize.value));

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.onclick = () => {
      currentPage = i;
      renderPaginatedList();
    };
    container.appendChild(btn);
  }
}

function createPaginationDiv() {
  const div = document.createElement("div");
  div.id = "paginationControls";
  document.body.appendChild(div);
  return div;
}

// Reuse from earlier step
function renderEmployees(list) {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";

  list.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";

    card.innerHTML = `
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;

    container.appendChild(card);
  });
}

function editEmployee(id) {
  localStorage.setItem("editId", id);
  window.location.href = "add-edit.html";
}

function deleteEmployee(id) {
  if (confirm("Delete this employee?")) {
    employees = employees.filter(e => e.id !== id);
    applyAllFilters();
  }
}

// Attach listeners
searchInput.addEventListener("input", applyAllFilters);
sortBy.addEventListener("change", applyAllFilters);
pageSize.addEventListener("change", applyAllFilters);
filterDept.addEventListener("change", applyAllFilters);
filterRole.addEventListener("change", applyAllFilters);

// Initial load
applyAllFilters();
