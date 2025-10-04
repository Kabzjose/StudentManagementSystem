const input1 = document.getElementById("admno");
const input2 = document.getElementById("name");
const input3 = document.getElementById("score");
const button = document.getElementById("btn");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Add or update student
function addStudent() {
  if (
    input1.value.trim() === "" ||
    input2.value.trim() === "" ||
    input3.value.trim() === ""
  )
    return; // prevent empty inputs

  let name = input2.value.trim();
  let score = Number(input3.value.trim());
  let admission = String(input1.value.trim());

  // Only alphabets for name
  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Name should only contain letters.");
    return;
  }

  // Admission must be exactly 5 digits
  if (admission.length !== 5 || isNaN(admission)) {
    alert("Admission number must be exactly 5 digits.");
    return;
  }

  // Validate score
  if (score < 0 || score > 100) {
    alert("Score must be between 0 and 100.");
    return;
  }

  // Add new student
  students.push({
    admno: admission,
    name: name,
    score: score,
  });

  localStorage.setItem("students", JSON.stringify(students));
  input1.value = "";
  input2.value = "";
  input3.value = "";
  button.innerText = "Add Student"; // reset button text 
  renderStudents();
}

// Render students in table
function renderStudents() {
  const tbody = document.getElementById("tablebody");
  tbody.innerHTML = ""; // clear existing rows

  students.forEach((student, index) => {
    const tr = document.createElement("tr");

    const admnotd = document.createElement("td");
    admnotd.innerText = student.admno;
    tr.appendChild(admnotd);

    const nametd = document.createElement("td");
    nametd.innerText = student.name;
    tr.appendChild(nametd);

    const scoretd = document.createElement("td");
    scoretd.innerText = student.score;
    tr.appendChild(scoretd);

    // Action cell with Edit and Delete
    const actiontd = document.createElement("td");

    // Edit button
    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.style.marginRight = "5px";
    editbtn.addEventListener("click", () => {
      input1.value = student.admno;
      input2.value = student.name;
      input3.value = student.score;
      button.innerText = "Update Student";

      // Temporarily remove student to update later
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderStudents();
    });
    actiontd.appendChild(editbtn);

    // Delete button
    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Delete";
    deletebtn.addEventListener("click", () => {
      const confirmation = confirm(
        `Are you sure you want to delete ${student.name}?`
      );
      if (confirmation) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
      }
    });
    actiontd.appendChild(deletebtn);

    tr.appendChild(actiontd);
    tbody.appendChild(tr);
  });
}

// Initial render
renderStudents();

// Enter key adds or updates student
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addStudent();
});

// Button click
button.addEventListener("click", addStudent);

// Arrow key navigation between inputs and button
const inputs = [input1, input2, input3, button];
inputs.forEach((input, index) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index + 1 < inputs.length) inputs[index + 1].focus();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index - 1 >= 0) inputs[index - 1].focus();
    }
  });
});
