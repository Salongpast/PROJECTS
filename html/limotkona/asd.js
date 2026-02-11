function person(fName, lName){
     this.Name = fName
     this.LastName = lName 
}

const person1 = new person('Bill','Bien')
const person2 = new person('Elijah','Lopez')

person.prototype.getFullName = 'test';

console.log(person1)
console.log(person2)

