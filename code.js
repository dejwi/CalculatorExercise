//display function
const displaydiv = document.querySelector('#sumdisplay');
const display = (txt, add = true) => {
    if(add) displaydiv.textContent += txt;
    else displaydiv.textContent = txt;
};

//num btns click
const numKeys = document.querySelectorAll("button[data-key='num']");
numKeys.forEach(e => 
    e.addEventListener('click', e => numClick(e.target.textContent))
);

//clear
document.querySelector("button[data-key='clear']").addEventListener('click',()=>clear());
function clear(){
    currNum = 0;
    display('',false);
}
//reset all
document.querySelector("button[data-key='clearall']").addEventListener('click',()=>{
    firstInEq = true;
    currSum = null;
    currNum = 0;
    eqType = null;
    display('',false);
});

//eq btns click
const eqKeys = document.querySelectorAll("button[data-key='eq']");
eqKeys.forEach(e => e.addEventListener('click',e =>eqClick(e.target.textContent)));

//add . to num
document.querySelector("button[data-key='=']").addEventListener('click', ()=>calculate());
document.querySelector("button[data-key='.']")
.addEventListener('click', ()=>dotClick());
function dotClick(){
    if(currNum>=0) currNum+='.';
    display(currNum,false);
}

//clears display when typing number
let firstInEq = true;

let currNum = '';
let currSum = null;
let eqType = null;

function numClick(num){
    if(firstInEq) display('',false);
    currNum+=num;
    display(num);
    firstInEq = false;
}
function eqClick(type){
    //console.log(currNum);
    //console.log(currSum);
    if(Number.isFinite(currSum) && currNum) {
        switch(type){
            case '+':
                currSum += +currNum;
                break;
            case '-':
                currSum -= (+currNum);
                break;
            case '*':
                currSum *= (+currNum);
                break;
            case '/':
                currSum /= +currNum;
                break;
        }
    }
    if(!Number.isFinite(currSum) ) {currSum = +currNum};
    
    currNum = '';
    if(Number.isFinite(+currSum)) currSum.toFixed(6);
    if(eqType) display(currSum,false);
    eqType = type;
    firstInEq = true;
}

function calculate(){
    if(!eqType) return;
    eqClick(eqType);
    eqType = null;
}

//keyboard support
const numsArray = ['0','1','2','3','4','5','6','7','8','9'];
const eqArray = ['+','-','*','/'];
const allKeys = numsArray.concat(eqArray,['.','c','Enter']);
window.addEventListener('keydown',e=>{
    if(numsArray.includes(e.key)) numClick(e.key);
    if(eqArray.includes(e.key)) eqClick(e.key);
    if(e.key === '.') dotClick();
    if(e.key === 'Enter') {
        document.querySelector("button[data-key='=']").classList.add('keydown');
        calculate();
    };
    if(e.key === 'c') clear();
    if(allKeys.includes(e.key)) Array.from(allBtns).find(x=>x.textContent.toLowerCase()==e.key).classList.add('keydown');
});
const allBtns = document.querySelectorAll('button');
allBtns.forEach(e => e.addEventListener('transitionend', removeTransition));
function removeTransition(e) {
    if (e.propertyName !== 'background-color') return;
    e.target.classList.remove('keydown');
}