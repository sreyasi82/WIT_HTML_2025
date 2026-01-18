/* */

export async function get_quotation(message, name){
    console.log("Inside get_quotation");
    try{
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://type.fit/api/quotes");
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            /* get random index to get randome data */
            const index = Math.floor(Math.random() * 4);
            console.log(jsonResponse, index);
            console.log(jsonResponse[index]['text'], index);
            console.log(jsonResponse[index]['author'], index);
            let quote = jsonResponse[index]['text'];
            let author = jsonResponse[index]['author'];
            /*Get the quote */
            message.innerHTML = `<h2>Happy Birthday, ${name}!</h2>                           
                              <br>
                              <strong>${quote}</strong> 
                              <br>
                              <i>-${author}</i>`;                                          
            }
        }catch(e){
            console.log(e);
    }
}
//https://cors-anywhere.herokuapp.com/https://type.fit/api/quotes";

export async function get_quotation_alt(){
    const endpoint = "https://type.fit/api/quotes";
    const request = await fetch(endpoint);
    console.log(request);
    request
    .then(response => response.json())
    .then(json =>{
        console.log(json);
        const index = Math.floor(Math.random() * 4);
        console.log(json[index]['text'], index);
        console.log(json[index]['author'], index); 
        /*Get the quote */
        let str_arr = [json[index]['text'],json[index]['author']];
        return str_arr;   
    })
    .catch(e => console.log(e));
}


export function playMusic() {
    // Create a new Audio object with the file path
    let birthdaySong = new Audio('./resources/mp3/Happy_bday_music');
    // Play the song
    birthdaySong.play();
}
