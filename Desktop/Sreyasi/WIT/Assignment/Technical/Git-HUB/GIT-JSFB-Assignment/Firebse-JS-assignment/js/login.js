//Page for main signup page's functionality
import {create_new_User, signIn_Existing_user } from "./authentication.js"
import { get_bday_string } from "./birthdayCalculator.js";

//get the initial button's reference
const btn_init = document.getElementById('Initial_login');
const login_form = document.getElementById('login_form');
const signup_content = document.getElementById('signup_content');
const btn_signup = document.getElementById('RegisterBtn');
const btn_login = document.getElementById('LoginBtn');
const birthday_input = document.getElementById('birthday_input');
const isSuccess = false;

let name = '';
let email = '';
let bday = '';
let password = '';
let is_new_user = false;
let u_id = '';

function change_display(isDisplay){
    /* show the login form and hide the initial button */
    if(isDisplay){
        btn_init.style.display = 'None';
        login_form.style.display = 'block';
        signup_content.style.display = 'block';

    }else {
        /* hide the login form and show the initial button */
        btn_init_login.style.display = 'block';
        login_form.style.display = 'none';
        signup_content.style.display = 'none';
    }    
}

function get_form_data(){
    name = document.getElementById('reg-name').value;
    email = document.getElementById('reg-email').value;
    password = document.getElementById('reg-password').value;
    let temp_bday = document.getElementById('reg-birthday').valueAsDate; 
    if(is_new_user)     
        bday = get_bday_string(temp_bday, true); /*get birthday for new user*/
      
}

btn_init.addEventListener('click',(e)=>{
    e.preventDefault();    
    change_display(true);  

})

btn_signup.addEventListener('click', (e)=>{
    e.preventDefault();       
    birthday_input.style.display = 'block';  
    signup_content.style.display = 'none';  
    is_new_user = true;
    btn_login.innerHTML = 'Register';
})

btn_login.addEventListener('click', (e)=> {
    var return_promise = null;
    e.preventDefault();
    get_form_data();
    console.log(email, password);
    if(is_new_user){   
        console.log("Authenticating as new user");            
        return_promise = create_new_User(name, email, password, bday, isSuccess);
        console.log("after create_new_User call, returned value is :", isSuccess);        
    }
    else{
        console.log("Authenticating as existing user");
        return_promise = signIn_Existing_user(email, password, isSuccess);
        console.log("after signIn_Existing_user call, returned value is :", isSuccess);
    } 
    
})
