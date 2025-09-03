let jugador;
let computadora;
let opciones = ['Piedra', 'Papel', 'Tijera'];
function IniciarJuego(){
    jugador = prompt("Elige: Piedra, Papel o Tijera");
    computadora = opciones[Math.floor(Math.random() * opciones.length)];
    if(jugador === computadora){     
        alert("Empate! Ambos eligieron " + jugador);
}else if(jugador === 'Piedra' && computadora=='Papel'){
    alert("Perdiste! La computadora eligió " + computadora);
}else if(jugador === 'Piedra' && computadora=='Tijera'){
    alert("Ganaste! La computadora eligió " + computadora);
}else if(jugador === 'Papel' && computadora=='Tijera'){
    alert("Perdiste! La computadora eligió " + computadora);
}else if(jugador === 'Papel' && computadora=='Piedra'){
    alert("Ganaste! La computadora eligió " + computadora);
}else if(jugador === 'Tijera' && computadora=='Piedra'){
    alert("Perdiste! La computadora eligió " + computadora);
}else if(jugador === 'Tijera' && computadora=='Papel'){
    alert("Ganaste! La computadora eligió " + computadora);
}else if(jugador != 'Piedra' && jugador != 'Papel' && jugador != 'Tijera'){
    alert("Elección inválida. Por favor, elige Piedra, Papel o Tijera.");
    IniciarJuego();;
}else{
alert("Error, ingreso de datos incorrecto.")
}};