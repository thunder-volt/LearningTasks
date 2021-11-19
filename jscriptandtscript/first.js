console.log('hello');
const arr = [4, 13, 8, 9, 1];
for(let i = 0; i < arr.length - 1; i++){
    for(let j = i+1; j < arr.length; j++){
        if(arr[j] > arr[i]){
            let temp = 0;
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }
}
console.log(arr);
let sum = 0;
for(let i = 0; i < arr.length; i++){
    sum += arr[i]; 
}
console.log(sum);
const arr1 = [ 9, 8, 7, 6, 5, 4, 3 ];
console.log(arr1);
const songs = ["Dynamite","Butter","Fire", "Power"];
songs.pop();
console.log(songs);
songs.unshift("Friends");
console.log(songs);
let anonymous =() =>{
    console.log("KPOP");
}
let d = new Date();
console.log(d);
anonymous();
let arrns = [1,2 ,3,4];
for(let arrn of arrns){
    console.log(arrn)
}