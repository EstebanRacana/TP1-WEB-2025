const cartas=['K','Q','J','10','9','8','7','6','5','4','3','2'];

function jugar(jugador){
 const computadora =[Math.floor(Math.random() * cartas.length)];
    alert("Tiene: "+computadora);
    const jugador=[Math.floor(Math.random() * cartas.length)];
    alert("Tienes: "+jugador);
};
