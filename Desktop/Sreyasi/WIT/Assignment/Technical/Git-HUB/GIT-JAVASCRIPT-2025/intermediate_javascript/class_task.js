//create a class mammal with one variable
//create method(s)
//getter, setter, static methid
//introduce mammal
//on browser print the introduction of mammal

//create  a subclass of mammal called human
//on browser print the introduction of human and
//let us know its a subclass of mammal
//create a static method for both
class Mammal {
    constructor(name){
        this._name = name;
        this._hasVertebra = true;
    }
    get name(){
        return this._name;
    }
    set name(newName){
        this._name = newName;
    }
    /*private variable/method starts with #
    #chartostring(){

    }*/
    show_intro(){
    return "Mammals characteristics are: hair, produce milk, warm-blooded, vertebrates.";
   }
}
class human extends Mammal {
    constructor(species){
        super("human");
        this._hasCognitivePower = true;
    }
    show_human_intro(){
        return "Human's characteristics are: Along with mammal's characteristics, they have brain with cognitive power";
    }
}

const mammal_obj = new Mammal("Dog");
//let mammal_html = document.getElementsByClassName("Mammal");
let text = mammal_obj.show_intro();
console.log(text);
document.getElementById("intro_mammal").innerHTML = text;

const human_obj = new human("Human");
//let human_html = document.getElementsByClassName("Human");
let second_text = human_obj.show_human_intro();
console.log(second_text);
document.getElementById("intro").innerHTML = text + " " + second_text;
