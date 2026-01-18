function is_date1_before_date2(date1,date2){
    console.log("Inside is_date1_before_date2 with :", date1, date2);
	//convert date1 and date2 string to array [m1,d1], [m2,d2])
    let m1 = date1[1];
    let d1 = date1[2];
    let m2 = date2[1];
    let d2 = date2[2];
	return (m1 < m2 ? true : (m1 == m2 ? d1 < d2 : false));
}

function is_leapYear(year){	
    console.log("Inside is_leapYear with :", year);
	return (year % 4 == 0) && ( (year % 100 != 0) || (year % 400 == 0) );
}

function count_days(date_arr){
    console.log("Inside count_days: ", date_arr);
    let days_in_month_arr = [];
    let total_days = 0;
    console.log(typeof(date_arr[1]), date_arr[0],date_arr[1],date_arr[2]);
    if(is_leapYear(date_arr[0])){
        days_in_month_arr = [31,29,31,30,31,30,31,31,30,31,30,31];
    }else{
        days_in_month_arr = [31,28,31,30,31,30,31,31,30,31,30,31];
    }   

    let limit = date_arr[1] - 1;
    console.log("limit, days_in_month_arr ", limit, days_in_month_arr);

    for(let i=0; i< limit; i++){
        total_days += days_in_month_arr[i];
    }
    total_days += date_arr[2];
    console.log("output: ", total_days);
    return total_days;
}

function count_diff(bday, today){
    console.log("inside count_diff(): ", bday, today);
    let day_diff = 0;
    //if bday is today
    if((bday[1] == today[1]) && bday[2] == today[2]){
        return 0;
    }else{
        //check bday is yet to come in this year or not
        console.log(is_date1_before_date2(today, bday));
        if(is_date1_before_date2(today, bday)){
            //assign this year to birth year
            bday[0] = today[0];
            day_diff = count_days(bday) - count_days(today);
        }else{
            bday[0] = today[0] + 1; 
            console.log(is_leapYear(today[0])); 
            if(is_leapYear(today[0])){
                day_diff = 366 - count_days(today)+ count_days(bday);
            }
            else{
                day_diff = 365 - count_days(today) + count_days(bday);
            }                
        }
        console.log("difference counted: ", day_diff);
        return day_diff;
    }    
}

/*function to convert a given string to mm/dd/yyyy format  */
export function get_bday_string(temp_string_bday, isString){    
    console.log("Inside get_bday_string :", typeof(temp_string_bday),temp_string_bday)
    if(typeof(temp_string_bday) === 'string'){
        if(isString){
            console.log("input is already a string, retunning the same.");
            return temp_string_bday;
        }else{
            let separators = temp_string_bday.match(/[-/]/g);
            console.log(separators);
            let arr = temp_string_bday.split(separators[0]).map(Number);
            if(separators[0] === '/')
                return arr.reverse();
            else
                return arr;
        }
        
    }else if(typeof(temp_string_bday) === 'object'){
        let month = temp_string_bday.getMonth() + 1;
        let day = temp_string_bday.getDate() + 1;
        let year = temp_string_bday.getFullYear();
        if(isString){        
            let string_bday = year + '-' + month + '-'+ day;
            console.log(string_bday);
            return string_bday;
        }else{
            return [year,month,day];
        }
    }   
    else
        return "wrong input";
          
}

//open and handle the page for logged in users
export function check_birthday(birthday){
    console.log("Inside check_birthday")
    console.log(birthday);
    if (birthday == null){
        console.log("returning null as birthday string received, is null");
        return null;
    }
    //let today = new Date().toLocaleString();
    let today = new Date();
    //get the yr, mnth, date as an array
    let current_date = get_bday_string(today, false);
    console.log("Todays's date is: ", current_date);    
    let bday = get_bday_string(birthday, false);
    console.log("birthday is: ", bday);    
    return count_diff(bday, current_date); 
}

