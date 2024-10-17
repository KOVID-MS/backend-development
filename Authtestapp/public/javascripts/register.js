function showPassword(event){
    event.preventDefault();
    var password = document.getElementById("password");
    const icon = event.target;

    if(password.type === 'password'){
        password.type = 'text';
        icon.src = "/images/hide.png";
    }
    else if(password.type === 'text'){
        password.type = 'password';
        icon.src = '/images/eye.png';
    }
}
