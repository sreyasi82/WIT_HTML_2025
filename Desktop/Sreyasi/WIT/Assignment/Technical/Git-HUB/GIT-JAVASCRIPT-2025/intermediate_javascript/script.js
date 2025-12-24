//class, object, constructor,inheritance, static

class Mammal {
    constructor(name){
        this._name = name;
        this._habit = "Land";
    }
    get name(){
        return this._name;
    }
    set name(newName){
        this._name = newName;
    }
}

const dog = new Mammal("Dog");
console.log(dog.name);
dog.name = "Puppy";
console.log(dog.name);
let crocky = new Mammal({name: "crocodile", habitat:"water"})