import { app, dbRef } from "./config.js";
import { open_loggedIn_page } from "./loggedInPage.js";

/* update te database */
export function update_table(user){ 
    console.log("Inside update_table function with:", user);
    console.log("checking if dbRef works: dbRef.ref('users/'): ",dbRef.ref('users/'));
    let userId = user.userId;

    //firebase.database().ref('users/' + userId).set({
    dbRef.ref('users/' + userId).set({
        username: user.name,        
        email: user.email,
        birthday: user.birthday       
    });
}
/*read data from the database using the uid*/
export async function get_current_user_detail(user){
    let uid = user.userId;
    console.log("Inside get_current_user_detail: ", user, uid);
    //const read_data = await dbRef.ref().child("users").child(uid).get();
    await dbRef.ref().child("users").child(uid).get()
    .then((snapshot) => {
        if (snapshot.exists()) {
            console.log("snapshot.val()",snapshot.val());
            user.name = snapshot.val().username || 'Anonymous';
            user.birthday = snapshot.val().birthday || '';
            open_loggedIn_page(user);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

