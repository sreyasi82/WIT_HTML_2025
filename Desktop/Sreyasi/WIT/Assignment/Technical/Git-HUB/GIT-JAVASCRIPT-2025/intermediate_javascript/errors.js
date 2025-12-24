//javascript error stack trace
age = 4;
countryVisited = "4";
console.log(age + countryVisited);
/*if(typeof age!= number) ||(typeof countryVisited!= number){
    throw new Error("type is not correct");    
}*/
function fun1 (){
    console.log(2);
    console.log(3);
    //throw console.error("wrongly handled");
    
}

function fun2(){
    console.log(1);
    try{
        fun1();
    }catch(e){
        console.log(e);
    } 
    console.log(4);
}

console.log(fun2());
console.log(5);

console.log("first print this");
var a = "zero"
setTimeout(()=>{
    console.log("This is an async");
    a = "one"
}, 1000)

console.log(a);

console.log(`1. ${new Date().getSeconds()}`);
setTimeout(()=>{
    console.log(`2. ${new Date().getSeconds()}`);
}, 0)
console.log(`3. ${new Date().getSeconds()}`);
console.log(`4. ${new Date().getSeconds()}`);
console.log(`5. ${new Date().getSeconds()}`);
setTimeout(()=>{
    console.log(`6. ${new Date().getSeconds()}`);
}, 0)
console.log(`7. ${new Date().getSeconds()}`);
console.log(`8. ${new Date().getSeconds()}`);
console.log(`9. ${new Date().getSeconds()}`);
console.log(`10. ${new Date().getSeconds()}`);

