const str = "hello";
console.log(str);
console.log("hello world");
//values can be changed is ts but not their datatypes
//basically you need to mention the type of the data passed in  
const circ = (diameter : number) => {
    return diameter * Math.PI;
}
console.log(circ(7));
let arr = ["hello", "vemdu", "gendu"];
arr[3]="paglu";
console.log(arr);
// arr[2]=23 an error in ts
let num : number;
num = 20;
console.log(num);
console.log(typeof(num));
let c : boolean;
c = true;
console.log(typeof(c));
let diff : (string|number)[] = [];
diff.push("hello");
diff.push(1);
console.log(diff);
// any is a type where we can assign anything 
let func : (name : string, array: (string|number)[]) => void;
func = (name : string, array: (string|number)[]) => {
    console.log(name);
}
func("yath", arr);
let func1 : (details :{name :string, id : number}) => number;
func1 = (details : {name : string, id : number}) => {
    console.log(details.name);
    return details.id;
}
let det = {
    name :"yatharth",
    id : 2090
}
console.log(func1(det));
let defin :any =[];
defin.push(1);
defin.push("hello");
console.log(defin);
//classes in ts
class person {
    constructor(public name : string, public details : {name : string , id : number}){
        this.name = name;
        this.details =  details;
    }
};
let arrn = [1,2,3,4];
for(let val of arrn){
    console.log(val);
}