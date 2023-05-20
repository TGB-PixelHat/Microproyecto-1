const btnClosePopup = document.querySelector("#close-popup");
const popup = document.querySelector("#popup");


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
    }
});


