
    let submit=document.getElementById("Submit");
    submit.addEventListener("click", function(e){
        e.preventDefault();
let name=document.getElementById("Name").value.trim();
    if(name===""){
        alert("Name is required");
    }
let email=document.getElementById("email").value.trim();
    let pos1=email.indexOf("@");
    let pos2=email.lastIndexOf(".");
   if(pos1 <1 || pos2 <pos1+2 ||pos2 >=email.length-1){
    alert("Please enter a valid email id");
    
   }
  
let age=document.getElementById("age").value.trim();
    if(age<18 || age>100){
        alert("invalid age");
    }
    else{alert("form submitted");}
})
//Q5
// filter
let arr=[];
let num=[1,2,3,4,5,6];
num.filter(function(n){
    if(n%2!=0){
        console.log(n)
        arr.push(n);       
    }
})
console.log(arr);

//Map

let d=arr.map(function(n){
    return n*2;
})
console.log(d);

//Reduce
let s=d.reduce(function(acc,nu){
    return acc+nu;
}

,0)
console.log(s);

// PYQ question est 
 
let bt=document.getElementById("btn");
bt.addEventListener("click",function b(){
    let l=document.getElementById("led");
    let ni=document.createElement("li");
    ni.textContent="Shake";
    l.appendChild(ni);
})
 
//pyq mst  2024

//q1
let nu=[1,2,3,4,5,6];
let sum1=0;
function sum2(){
    for(let i=0;i<nu.length;i++){
        if(nu[i]%2!==0){
          nu.pop[i];
        }
        else{
            sum1=sum1+nu[i];
        }
    }
    console.log("sum is"+sum1);
}
sum2();

//q4
let r=document.getElementById("ii");
r.style.backgroundColor="red";
// r.innerHTML="heading";
let b=document.getElementById("btn1");
b.addEventListener("click",function q(){
 let t=document.getElementById("ii");
 t.textContent="heading";
 let co=document.getElementsByClassName("info");
 console.log(co);
})


