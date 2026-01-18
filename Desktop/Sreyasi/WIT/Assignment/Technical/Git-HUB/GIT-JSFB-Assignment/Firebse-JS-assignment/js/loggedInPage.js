import { check_birthday } from "./birthdayCalculator.js";
import { get_quotation } from "./BirthdayMessage.js";
import { signOut_user } from "./authentication.js";

var current_user = '';
let new_window = {};

export function open_loggedIn_page(user){
   /* log the user details */
    current_user = user;
    console.log("Inside open_logedIn_page function with user:", current_user);    
    // switch to loggedInPage.html
    //window.location.reload();    
    const new_window = window.open("./loggedInPage.html", "_blank");  
    //new_window = window.open("./loggedInPage.html");  
    //new_window = window.location.href("./loggedInPage.html");  
    //const new_window = window.location.replace("./loggedInPage.html");     
    if (new_window) {
        new_window.addEventListener('DOMContentLoaded', () => {
            console.log('Child window DOM is ready');
            // You can now safely access the DOM, e.g.:
            const element = new_window.document.getElementById('welcome_text');
            if (element) {
                if(current_user.name){
                    element.textContent = `Hello! ${current_user.name}`;
                }
                else {
                    element.textContent = `Hello! ${current_user.email}`;
                }                
            }
            show_birthday_message(new_window, current_user);
        });
    }          
     
}



function show_birthday_message(window,user){
    console.log("Inside show_birthday_message: ", window, user);
    let date_diff = check_birthday(user.birthday);
    if(date_diff === null){
        console.log("received null from check_birthday()");
        return null;
    }
    let message = window.document.getElementById('birthday_message');
    if(date_diff === 0){
        message.style.display = 'block';
        get_quotation(message, user.name);        
        console.log( message);       
        
    }else{
        message.style.display = 'block';
        message.innerHTML = `<h2>${date_diff} DAYS LEFT</h2>
                              <h4 id="quote">UNTIL YOUR BIRTHDAY!</h4>`;
    }
}

function logout(){
    console.log("logout function called");
    if(new_window.document){
        signOut_user();   
    }
}
// if(new_window.document){
//     let btn_logOut = new_window.document.getElementById('LogOutBtn');   
//     let ok_btn = new_window.document.getElementById('okBtn');

//     // btn_logOut.addEventListener('click', (e)=>{
//     //     signOut_user();
//     // });
    
//     ok_btn.addEventListener('click', (e) => {
//         e.defaultPrevented();
//         let message = document.getElementById('birthday_message');
//         message.style.display = 'none';
//     });
// }
function hide_message(){
    if(new_window.document){
        let message = document.getElementById('birthday_message');
        message.style.display = 'none';
    }

}