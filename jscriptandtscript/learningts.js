var str = "hello";
console.log(str);
console.log("hello world");
//values can be changed is ts but not their datatypes
//basically you need to mention the type of the data passed in  
var circ = function (diameter) {
    return diameter * Math.PI;
};
console.log(circ(7));
var arr = ["hello", "vemdu", "gendu"];
arr[3] = "paglu";
console.log(arr);
// arr[2]=23 an error in ts
var num;
num = 20;
console.log(num);
console.log(typeof (num));
var c;
c = true;
console.log(typeof (c));
var diff = [];
diff.push("hello");
diff.push(1);
console.log(diff);
// any is a type where we can assign anything 
var func;
func = function (name, array) {
    console.log(name);
};
func("yath", arr);
var func1;
func1 = function (details) {
    console.log(details.name);
    return details.id;
};
var det = {
    name: "yatharth",
    id: 2090
};
console.log(func1(det));
var defin = [];
defin.push(1);
defin.push("hello");
console.log(defin);
//classes in ts
var person = /** @class */ (function () {
    function person(name, details) {
        this.name = name;
        this.details = details;
        this.name = name;
        this.details = details;
    }
    return person;
}());
;
var arrn = [1, 2, 3, 4];
for (var _i = 0, arrn_1 = arrn; _i < arrn_1.length; _i++) {
    var val = arrn_1[_i];
    console.log(val);
}
