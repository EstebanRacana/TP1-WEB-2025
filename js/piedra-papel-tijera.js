//Pone las constantes y un array de opciones
const minijuego_2 = document.querySelector(".minijuego_2"); 
const opciones = ['Piedra', 'Papel', 'Tijera'];

//Hace un forEach para crear botones
opciones.forEach(opcion => {
    const btn = document.createElement("button"); //Aca crea el primer boton
    btn.textContent = opcion; //Muestra los botones con sus respectivos nombres como Piedra, papel o Tijera
    btn.addEventListener("click", () => jugar(opcion)); //Clickea y ejecuta jugar
    minijuego_2.appendChild(btn);  //Agrega los botones al div minijuego_2
});
//Hace la funcion jugar que adentro esta la variable jugador y computadora
function jugar(jugador) {
    //Genera una eleccion aleatorio de la computadora a traves de las opciones del array
    const computadora = opciones[Math.floor(Math.random() * opciones.length)];
    //Hace comparaciones entre el jugador y la computadora y muestra los mensajes necesarios
    if (jugador === computadora) {     
        alert("Empate! Ambos eligieron " + jugador);
    } else if (
        (jugador === 'Piedra' && computadora === 'Tijera') ||
        (jugador === 'Papel' && computadora === 'Piedra') ||
        (jugador === 'Tijera' && computadora === 'Papel')
    ) {
        alert("Ganaste! La computadora eligió " + computadora);
    } else {
        alert("Perdiste! La computadora eligió " + computadora);
    }
}
