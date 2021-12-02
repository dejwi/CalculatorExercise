const displaydiv = document.querySelector('#sumdisplay');
const display = (txt, add = true) => {
    if(add) displaydiv.textContent += txt;
    else displaydiv.textContent = txt;
};

const numKeys = document.querySelectorAll("button[data-key='num']");
numKeys.forEach(e => 
    e.addEventListener('click', e => numClick(e.target.textContent))
);

//clear
document.querySelector("button[data-key='clear']").addEventListener('click',()=>{
    currNum = 0;
    display('',false);
});

//reset all
document.querySelector("button[data-key='clearall']").addEventListener('click',()=>{
    firstInEq = true;
    currSum = null;
    currNum = 0;
    eqType = null;
    display('',false);
});

const eqKeys = document.querySelectorAll("button[data-key='eq']");
eqKeys.forEach(e => e.addEventListener('click',e =>eqClick(e.target.textContent)));

document.querySelector("button[data-key='=']").addEventListener('click', ()=>calculate());

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
    console.log(currNum);

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
                console.log('xx');
                console.log(currSum);
                console.log(currNum);

                currSum *= (+currNum);
                console.log(currSum);
                break;
            case '/':
                currSum /= +currNum;
                break;
        }
    }
    if(!Number.isFinite(currSum) ) {currSum = +currNum};
    
    currNum = '';

    if(eqType) display(currSum,false);
    eqType = type;
    firstInEq = true;
}

function calculate(){
    if(!eqType) return;
    eqClick(eqType);
    eqType = null;
}

