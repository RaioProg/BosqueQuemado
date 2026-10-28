const contenedorM = document.getElementById('spin_anchura_bosque');
const contenedorN = document.getElementById('spin_altura_bosque');
const contenedorP = document.getElementById('spin_probabilidad_arbol');
const contenedorQ = document.getElementById('spin_probabilidad_incendio');
const contenedorBoton = document.getElementById('simulacion');

let M
let N
let P
let Q

function prepararTablero() {
    M = contenedorM.value;
    N = contenedorN.value;
    P = contenedorP.value;
    Q = contenedorQ.value;
};

contenedorBoton.addEventListener('click', prepararTablero);


