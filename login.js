const loginbtn= document.getElementById("loginbtn")
const usernameInput=document.getElementById("username")
const passwordInput=document.getElementById("password")
const errorText=document.getElementById("error")

const USER ={
    username:"admin",
    password:"12345",
}
 loginbtn.addEventListener("click",()=>{
   const enteredUser=usernameInput.value.trim()
   const enteredPass=passwordInput.value.trim()
   if(enteredUser === USER.username && enteredPass === USER.password){
    //save login state
    localStorage.setItem("loggedIn","true")
    //redirect to main page
    window.location.href="index.html"
   }else{
    errorText.innerText="Invalid username or password"
   }
 })

 //if loggedin,redirect directly
 if(localStorage.getItem("loggedIn")==="true"){
    window.location.href="index.html"
 }