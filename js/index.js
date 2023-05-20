const btnClosePopup = document.querySelector("#close-popup");
const popup = document.querySelector("#popup");
let playerName = document.getElementById("player-name");
var cartas = document.querySelectorAll('.card');
let maxScore = 1000;


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


[...cartas].forEach((carta)=>{
  carta.addEventListener( 'click', function() {
    carta.classList.toggle('volteada');
  });
});