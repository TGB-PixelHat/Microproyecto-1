const btnClosePopup = document.querySelector("#close-popup");
const popup = document.querySelector("#popup");
let playerName = document.getElementById("player-name");
let btnStart = document.getElementById("start-button");
let maxScore = 1000;
let sec = 45;
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
    carta.classList.toggle('flip');
  });
});


const genenerateBoard = ()=>{
    [...cartas].forEach((carta)=>{
        if (carta.classList.contains("flip")){
            carta.classList.toggle('flip');
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
    genenerateBoard();
    Timer()    
})

const Timer=()=>{
    timer = setInterval(()=>{
        sec--;
        remainingTime.innerHTML = `Tiempo Restante: ${sec} s.`;
        if(sec <= 0){
            clearInterval(timer);
        }
    }, 1000);
}