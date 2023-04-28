const formInscription = document.querySelector('#formInscription');
const eyesPassword = document.querySelectorAll('.password-input .showpass');

// FormData

/*
 * 
 *  Events
 * 
 */

formInscription.addEventListener('submit', (e) => 
{
    e.preventDefault();
    removeAllErrors();
    let sucess = true;
    
    if(formInscription["email"].value.trim().length === 0 ||
         formInscription["fullName"].value.trim().length === 0 ||
         formInscription["password"].value.trim().length === 0 ||
         formInscription["confirmPassword"].value.trim().length === 0
         )
    {
        sucess = false;
        formInscription.appendChild(generateError('Remplir les champs')).after(formInscription["submit"])
    }
    else
    {
        if(!checkPassword(formInscription["password"]))
            sucess = false; 

        if(!checkPasswordConfirmation(formInscription["password"], formInscription["confirmPassword"]))
            sucess = false;   
    }

    if(sucess)
        // launch event 
        alert("success")
   
})

eyesPassword.forEach(ep => 
{
    ep.addEventListener("click", () => {

        if(ep.previousElementSibling.type == "password")
        {
            ep.children[0].classList.replace("fa-eye","fa-eye-slash")
            ep.previousElementSibling.type = "text"
        }
        else
        {
            ep.children[0].classList.replace("fa-eye-slash","fa-eye")
            ep.previousElementSibling.type = "password"
        }
    })
})

/*
 * 
 *  Functions 
 * 
 */


function checkPassword(password)
{
    // regex
    // traitement 
    let rgx = /^[a-zA-Z0-9]{10,}[?=.*!@#$%^&*]{1}$/
    if(rgx.test(password.value))
        return true;  
    
    password.parentElement.parentElement.appendChild(generateError('Le mot de passe doit contenir minimum 10 caractères dont 1 caractère spécial'));
    return false
}

function checkPasswordConfirmation(password1, password2)
{
    if(password1.value === password2.value)
        return true;        
        
    password2.parentElement.parentElement.appendChild(generateError('Le mot de passe doit etre identique'));
    return false
}

function generateError(message)
{
    let p = document.createElement('p')
        p.innerHTML = message;
        p.className = "text-danger error"
    return p;
}

function removeAllErrors()
{
    document.querySelectorAll('.error').forEach(el => el.remove())
}