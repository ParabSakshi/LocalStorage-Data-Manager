function getStudentData() {
      try {
        const parsed = JSON.parse(localStorage.getItem("Student"));
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.warn("Invalid localStorage data:", e);
        return [];
      }
    }

    function change_object(event) {
      event.preventDefault();

      const id = document.getElementById("id").value;
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const city = document.getElementById("city").value;
      const editIndex = document.getElementById("editIndex").value;

      const formData = { id, name, age, city };
      const data = getStudentData();

      if (editIndex === "") {
        data.push(formData);
      } else {
        data[editIndex] = formData;
        document.getElementById("editIndex").value = "";
      }

      localStorage.setItem("Student", JSON.stringify(data));
      clearForm();
      displayTable();
    }

    function displayTable() {
      const table_body = document.getElementById("table_body");
      const data = getStudentData();

      table_body.innerHTML = data.map((item, index) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.city}</td>
          <td>
            <button onclick="editEntry(${index})">Update</button>
            <button onclick="deleteEntry(${index})">Delete</button>
          </td>
        </tr>
      `).join('');
    }

    function editEntry(index) {
      const data = getStudentData();
      const item = data[index];

      document.getElementById("id").value = item.id;
      document.getElementById("name").value = item.name;
      document.getElementById("age").value = item.age;
      document.getElementById("city").value = item.city;
      document.getElementById("editIndex").value = index;
    }

    function deleteEntry(index) {
      const data = getStudentData();
      data.splice(index, 1);
      localStorage.setItem("Student", JSON.stringify(data));
      displayTable();
    }

    function clearForm() {
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("city").value = "";
      document.getElementById("editIndex").value = "";
    }

    displayTable();