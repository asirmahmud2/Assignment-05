document.getElementById("login-btn").addEventListener('click',()=>
{
    const loginInput=document.getElementById("login-username");
    const loginPass=document.getElementById("login-password");

    const username= loginInput.value;
    const password= loginPass.value;

    if(username=="admin" && password=="admin123")
    {
        alert("Login Successful");
        window.location.assign("./home.html");
    }
    else{
        alert("Wrong Username or Password")
    }
})git init