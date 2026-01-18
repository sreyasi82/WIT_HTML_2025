//import the config elements from config.js file
import { open_loggedIn_page } from "./loggedInPage.js";
import { app, auth } from "./config.js";
import { update_table, get_current_user_detail } from "./datahandling.js"


/*definition of signing function for new user */
export async function create_new_User(name, email, password, bday, isSuccess){    
    try{
        // Signed in
        console.log(email, password);
        const auth_credential = await auth.createUserWithEmailAndPassword(email, password);
        console.log("User is created with user:", auth_credential);                
        const uid = auth_credential.user.uid;
        console.log("User is created with uid:", uid);                
        let user = {
            name: name,
            email: email,
            birthday: bday,
            userId: uid
        }
        /* Update database  */
        update_table(user); 
        isSuccess = true;
        //switch to logged in page
        open_loggedIn_page(user);
    }catch(error){
        console.log("Error in user creation");
        console.log(error);
        window.alert("Either email or password is wrong. Please enter the credential correctly.");
        isSuccess = false;
    }
}

/*definition of signing function for existing */
export function signIn_Existing_user(email, password, isSuccess){    
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in          
        let user_data = {
            name: '',
            email: '',
            birthday: '',
            userId: ''
        };
        user_data.userId = userCredential.user.uid;
        user_data.email = email;
        get_current_user_detail(user_data);
        console.log(user_data);
        console.log("user is logged in.")  
        isSuccess = true; 
        //open_loggedIn_page(user_data);    
    })
    .catch((error) => {
        console.log(error);
        window.alert("Failed to Log In");
        isSuccess = false;       
    })
}

export function signOut_user(){
    auth.signOut()
    .then(() => {
        // Sign-out successful.
        console.log("Successfully signed out.");
        window.close();
    }).catch((error) => {
        // An error happened.
        console.log("Error while logging out");
    });
}


