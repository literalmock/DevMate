// let {hell,prt} = require('./app.js')
// let a = 5
// let b = 10
// prt();
// console.log(a + b); // Output: 15
// console.log(hell);
arrr = [1,2,3,4,5,9,15]
function recur(n){
    if(n==0){
        return arr[n];
    }
    return arr[n] + recur(n-1);
}

let saransh = recur(arrr.length - 1, arrr);
console.log(saransh); 