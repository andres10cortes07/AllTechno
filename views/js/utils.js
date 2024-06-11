//funcionalidad de ver/no ver contraseña en page login
const eyeBtn = document.querySelector(".login-eye");

const showInputPass = ()=> {
    if(eyeBtn){
        eyeBtn.classList.remove("bx-show");
        eyeBtn.classList.add("bx-low-vision");
        document.querySelector(".ctn-pass input").setAttribute("type", "text");
    }
}

const hideInputPass = ()=> {
    if(eyeBtn){
        eyeBtn.classList.remove("bx-low-vision");
        eyeBtn.classList.add("bx-show");
        document.querySelector(".ctn-pass input").setAttribute("type", "password");
    }
}
if (eyeBtn) {
    eyeBtn.addEventListener("click", (e) =>{
        e.preventDefault();
        if (eyeBtn.classList.contains("bx-show")) showInputPass()
        else hideInputPass();
    })    
}


// validacion de formulario de login 
const inpEmail = document.querySelector(".inp-email");
const inpPass = document.querySelector(".inp-pass");
const ctnPass = document.querySelector(".ctn-pass");
let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmail = () => {
    if(!regex.test(inpEmail.value)) {
        if(document.querySelector(".err-email")) document.querySelector(".err-email").innerHTML = ""
        let codeErrEmail = `
            <div class="ctn-err">
                <span class='login-err err-email'>Ingresa un correo válido</span>
            </div>
        `;
        if(document.querySelector(".err-email")) document.querySelector(".err-email").innerHTML = ""
        inpEmail.insertAdjacentHTML("afterend", codeErrEmail)
        return false
    }
    else {
        if(document.querySelector(".err-email")) document.querySelector(".err-email").innerHTML = ""
        return true
    }
}

const validatePassword = () => {
    if(inpPass.value.length < 6 || inpPass.value.length > 50) {
        if(document.querySelector(".err-pass")) document.querySelector(".err-pass").innerHTML = ""
        let codeErrPass = `
            <div class="ctn-err">
                <span class='login-err err-pass'>Ingresa una clave valida</span>
            </div>
        `;
        if(document.querySelector(".err-pass")) document.querySelector(".err-pass").innerHTML = ""
        ctnPass.insertAdjacentHTML("afterend", codeErrPass)
        return false
    }
    else {
        if(document.querySelector(".err-pass")) document.querySelector(".err-pass").innerHTML = ""
        return true
    }
}

if (inpEmail) {
    inpEmail.addEventListener("blur", validateEmail)
    inpPass.addEventListener("blur", validatePassword)
}