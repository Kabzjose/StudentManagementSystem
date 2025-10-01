let input1=document.getElementById("admno")
let input2=document.getElementById("name")
let input3=document.getElementById("score")
let button=document.getElementById("btn")


let students = JSON.parse(localStorage.getItem("students")) || [];

//addding students

function addStudent(){
    if (input1.value.trim() === "" || input2.value.trim() === "" ||input3.value.trim() === "")  return;//prevent empty inputs
    
    let name = input2.value.trim();//remove any spaces
    let score = Number(input3.value.trim());
    let admission = String(input1.value.trim()); 


    // Validate empty fields
  if (name === "") {
    alert("Please enter name.");
    return;
}

  // Admission must be exactly 5 digits
  if (admission.length !== 5 || isNaN(admission)) {
  alert("Admission number must be exactly 5 digits");
  return; // stop adding student
}
  
  // Validate score
  if (score < 0 || score > 100) {
    alert("Score must be between 0 and 100.");
    return;
  }

     students.push({
        admno:input1.value,
        name:input2.value,
        score:input3.value
     });
     localStorage.setItem("students", JSON.stringify(students));
    input1.value=""
   input2.value=""
   input3.value=""
   renderStudents();
}


button.addEventListener("click",addStudent)



function renderStudents(){
    let tbody=document.getElementById("tablebody")
    tbody.innerHTML=""//clear existing rows

    //looping through students array and creating rows
    students.forEach((student,index)=>{
        let tr =document.createElement("tr")
        //Admission number cell
        let admnotd=document.createElement("td")
        admnotd.innerText=student.admno
        tr.appendChild(admnotd)
        //name the cell
        let nametd=document.createElement("td")
        nametd.innerText=student.name
        tr.appendChild(nametd)
        //score cell
        let scoretd=document.createElement("td")
        scoretd.innerText=student.score
        tr.appendChild(scoretd)
        //Action cell -delete button
        let actiontd=document.createElement("td")
        let deletebtn=document.createElement("button")
        deletebtn.innerText="Delete"
        deletebtn.addEventListener("click",()=>{
            let confirmation = confirm(`Are you sure you want to delete ${student.name}?`);
  if (confirmation) {
            students.splice(index,1)//remove from array
            localStorage.setItem("students",JSON.stringify(students))//update storage
            renderStudents()  //refresh table
        }
        });
        actiontd.append(deletebtn)
        tr.appendChild(actiontd)
        
        //add row to table
        tbody.appendChild(tr)
    })
}
renderStudents();

input1.addEventListener("keydown", (e) => {//when you press enter the addStudent() executes 
  if (e.key === "Enter") addStudent();
});
