document.getElementById("trigger").addEventListener("click",function(){
    
    var usuario = document.getElementById("user");
    var contraseña = document.getElementById("pass");
    if(usuario.value == "" || contraseña.value == "" )
    {
        alert("Ingrese ambos campos ");
    }else{
        sessionStorage.setItem("user",usuario.value);
        sessionStorage.setItem("pass",contraseña.value);
        alert("Bienvenido "+usuario.value);
    
        window.location.href = "products.html";
    }
    
  
});
