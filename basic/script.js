console.log("Initial array")

var arr = [1,2,3,4]

arr.forEach((i)=>{
    console.log(i);
})
console.log("New array using map");


var arr2 = arr.map((i)=>{return i+12})

arr2.forEach((i)=>{
    console.log(i)
})

var arr3 = arr2.map((i)=>{
    if (i%2 == 0){
        return "Even"
    }
    else{
        return "Odd"
    }
})

console.log("Finding Odd or Even ");

arr3.forEach((i)=>{
    console.log(i);
    
})

var arr4 = arr.filter((i)=>{
    if (i%2 == 0){
        return true
    }
})

console.log("Finding only even numbers from list using filter");

arr4.forEach((i)=>{
    console.log(i);
})

var ans = arr4.find((i)=>{
    if(i==2){
        return i
    }
})
console.log("Finding a number using find");

console.log(ans);

console.log("Finding indeces using indexOf")

console.log("arr",1, arr.indexOf(1));
console.log('arr2',1, arr2.indexOf(1));
console.log('arr3',"Odd", arr3.indexOf("Odd"));
console.log('arr4',4, arr4.indexOf(4));
