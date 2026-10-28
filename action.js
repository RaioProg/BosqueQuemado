const contenedorM = document.getElementById('spin_anchura_bosque');
const contenedorN = document.getElementById('spin_altura_bosque');
const contenedorP = document.getElementById('spin_probabilidad_arbol');
const contenedorQ = document.getElementById('spin_probabilidad_incendio');
const contenedorBoton = document.getElementById('simulacion');
const config = document.getElementById('panel-config');
const tablero = document.getElementById('tablero');


let M
let N
let P
let Q

contenedorBoton.addEventListener('click', prepararTablero);

function pintarTablero() {

    tablero.innerHTML = '';
    let tablaDom = document.createElement('div');

    tablaDom.className = 'tablero';
    tablaDom.style.setProperty('--m', M);
    tablaDom.style.setProperty('--n', N);
    tablaDom.style.display = 'grid';
    tablaDom.style.gridTemplateColumns = `repeat(${M}, 1fr)`;
    tablaDom.innerHTML = '<div class="cell"></div>'.repeat(M * N);

    tablero.appendChild(tablaDom);
}

function prepararTablero() {
    M = parseInt(contenedorM.value);
    N = parseInt(contenedorN.value);
    P = parseFloat(contenedorP.value);
    Q = parseFloat(contenedorQ.value);

    if (isNaN(M) || isNaN(N) || M <= 0 || N <= 0) {
    alert('Introduce dimensiones válidas');
    return;
    }

    let bosque = new Array(M);
    for (let i = 0; i < M; i++) 
        bosque[i] = new Array(N);

    for (let i = 0; i < M; i++) 
        for (let j = 0; j < N; j++) 
            bosque[i][j] = 1;
       
    config.classList.toggle('oculto');
    tablero.classList.toggle('oculto');

    pintarTablero();
};

