const btnClosePopup = document.querySelector("#close-popup");
const btnCloseScoreboard = document.querySelector("#close-popup2");
const popup = document.querySelector("#popup");
const popup2 = document.querySelector("#popup2")
let playerName = document.getElementById("player-name");
let btnStart = document.getElementById("start-button");
let btnReset = document.getElementById("reset-button");
let btnScore = document.getElementById("score-button");
let scoreBoard = document.getElementById("scoreBoard")
let blockedBoard = true;
let maxScore = 1000;
let sec = 181;
let found = 0;
let timer;
let remainingTime = document.getElementById("remaining-time");
let scoreIndicator = document.getElementById("score");
let usuarios = [];
let antiguos;


const save = (finalscore) =>{
    let user = {name: `${playerName.innerHTML}`, score:finalscore};
    usuarios.push(user);
    localStorage.setItem("users",JSON.stringify(usuarios));
}

const cargar = () =>{

    antiguos=JSON.parse(localStorage.getItem("users"));
    if(antiguos !=null){
        usuarios = JSON.parse(localStorage.getItem("users"));
    }

    usuarios.sort(function(a,b){
        return b.score - a.score;
    })

    let text=[]
    console.log(usuarios.length);

    for(let i = 0; i< usuarios.length; i++){
        text.push(`
        <li class="listElement">${usuarios[i].name}:${usuarios[i].score}</li>
        `);
    }

    scoreBoard.innerHTML = text.join(" ")
    console.log(usuarios);

    
}

const showPopup = () =>{
    popup.showModal();
};

const showScoreboard = () =>{
    popup2.showModal();
}


document.onload = showPopup();
document.onload = popup2.close();
document.onload = cargar();

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

btnCloseScoreboard.addEventListener("click", () =>{
    popup2.close();
});

btnScore.addEventListener("click", ()=>{
    if(blockedBoard == true){        
        showScoreboard();
    }
});


const cartas = document.querySelectorAll('.card');

[...cartas].forEach((carta)=>{
  carta.addEventListener( 'click', function() {
    if(blockedBoard == false){       
        if(carta.classList.contains('absolute-flip')){
        }else{            
            carta.classList.toggle('flip');
        }
    }
  });
});


const genenerateBoard = ()=>{
    found = 0;
    scoreIndicator.innerHTML = `Puntuación:`
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
    if(blockedBoard == false){        
        clearInterval(timer);
        genenerateBoard();
        Timer();
    }
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
            alert("Tiempo Acabado! No recibiste ningún punto!");
        }
        if(found == 8){
            clearInterval(timer);
            blockedBoard = true;
            let finalscore = Math.round(maxScore * (sec/181));
            alert(`Juego Terminado! Puntuación Obtenida: ${finalscore}`)
            scoreIndicator.innerHTML = `Puntuación: ${finalscore}`
            save(finalscore);
        }
    }, 1000);
}


let selections = [];

const selectCard = (i)=>{
    if(blockedBoard == false){
        let card = document.getElementById(`tarjeta-${i}`);
        if(!card.classList.contains("flip") || !card.classList.contains("absolute-flip")){
            card.classList.toggle("flip");
            selections.push(i);
        }
        if(selections.length == 2){
            
            deselect(selections);
            
            selections=[]
            
        }
    }
}

const deselect = (selections) =>{
    blockedBoard = true;
    setTimeout(()=>{
        let card1 = document.getElementById(`tarjeta-${selections[0]}`);        
        let card2 = document.getElementById(`tarjeta-${selections[1]}`);
        
        let tarjeta1 = document.getElementById(`card-${selections[0]}`);
        let tarjeta2 = document.getElementById(`card-${selections[1]}`);


        if(tarjeta1 != tarjeta2){
            let str1 = card1.classList.toString().replace(" flip", "");
            let str2 = card2.classList.toString().replace(" flip", "");

            if(str1 == str2){

                tarjeta1.classList.add("absolute-flip");
                tarjeta2.classList.add("absolute-flip");
                found += 1;
                
            }else{
                tarjeta1.classList.toggle("flip");
                tarjeta2.classList.toggle("flip");
            }
        }  
                
    }, 1000);
    setTimeout(()=>{

    },1000);
    
    blockedBoard = false;
    

}
