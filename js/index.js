const btnClosePopup = document.querySelector("#close-popup");
const popup = document.querySelector("#popup");
let playerName = document.getElementById("player-name");
let btnStart = document.getElementById("start-button");
let btnReset = document.getElementById("reset-button");
let blockedBoard = true;
let maxScore = 1000;
let sec = 181;
let timer;
let remainingTime = document.getElementById("remaining-time");



const showPopup = () =>{
    popup.showModal();
};

document.onload = showPopup();

window.onkeydown = function(e){
    if(e.keyCode === 27){
        e.preventDefault();
    }
};


btnClosePopup.addEventListener("click", () =>{
    let text = document.getElementById("text").value;
    if(text == ""){
        alert("Por favor, introduce tu nombre");
    }else{        
        popup.close();
        playerName.innerHTML= `Jugador: ${text}`;
    }
});


const cartas = document.querySelectorAll('.card');

[...cartas].forEach((carta)=>{
  carta.addEventListener( 'click', function() {
    if(blockedBoard == false || !carta.classList.contains("absolute-flip")){        
        carta.classList.toggle('flip');
    }
  });
});


const genenerateBoard = ()=>{
    selections=[];
    [...cartas].forEach((carta)=>{
        if (carta.classList.contains("flip")){
            carta.classList.toggle('flip');
        }
        if (carta.classList.contains("absolute-flip")){
            carta.classList.remove('absolute-flip');
        }
      });

    for(let i = 0; i<16; i++){
        let card = document.getElementById(`tarjeta-${i+1}`);
        
        for(let j = 0; j < 8; j++){
            card.classList.remove(`cara-reverso${j+1}`);
        }
    }

    let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    numbers = numbers.sort(()=> {return Math.random() - 0.5});

    for(let i = 0; i < 16; i++){
        let reverse = document.getElementById(`tarjeta-${i+1}`);
        reverse.classList.add(`cara-reverso${numbers[i]}`);
    }
};


btnStart.addEventListener("click", ()=>{
    if(blockedBoard == true){
        genenerateBoard();
        Timer();
    }else{}    
})

btnReset.addEventListener("click",()=>{
    clearInterval(timer);
    genenerateBoard();
    Timer();
})

const Timer=()=>{
    blockedBoard = false;    
    sec = 181;
    timer = setInterval(()=>{
        sec--;
        remainingTime.innerHTML = `Tiempo Restante: ${sec} s.`;
        if(sec <= 0){
            clearInterval(timer);
            blockedBoard = true;
        }
    }, 1000);
}

let selections = [];

const selectCard = (i)=>{
    console.log("hola1");
    let card = document.getElementById(`tarjeta-${i}`);
    if(!card.classList.contains("flip") || !card.classList.contains("absolute-flip")){
        card.classList.toggle("flip");
        selections.push(i);
        console.log("hola2");
    }
    if(selections.length == 2){
        
        console.log("hola3");
        deselect(selections);
        
        selections=[]
        
    }
}

const deselect = (selections) =>{
    setTimeout(()=>{
        let card1 = document.getElementById(`tarjeta-${selections[0]}`);        
        let card2 = document.getElementById(`tarjeta-${selections[1]}`);
        
        let tarjeta1 = document.getElementById(`card-${selections[0]}`);
        let tarjeta2 = document.getElementById(`card-${selections[1]}`);
        console.log("hola4");
        console.log(card1.classList.toString());

        if(card1.classList.toString() == card2.classList.toString()){

            tarjeta1.classList.add("absolute-flip");
            tarjeta2.classList.add("absolute-flip");
        }else{
            
            console.log("hola5");
            tarjeta1.classList.toggle("flip");
            tarjeta2.classList.toggle("flip");
        }
    }, 1000);
}
