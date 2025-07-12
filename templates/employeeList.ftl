<#-- employeeList.ftl -->

<#list employees as emp>
  <div class="employee-card">
    <p><strong>ID:</strong> ${emp.id}</p>
    <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
    <p><strong>Email:</strong> ${emp.email}</p>
    <p><strong>Department:</strong> ${emp.department}</p>
    <p><strong>Role:</strong> ${emp.role}</p>
    
    <button onclick="editEmployee(${emp.id})">Edit</button>
    <button onclick="deleteEmployee(${emp.id})">Delete</button>
  </div>
</#list>
