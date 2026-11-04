const contenedorM = document.getElementById('spin_anchura_bosque');
const contenedorN = document.getElementById('spin_altura_bosque');
const contenedorP = document.getElementById('spin_probabilidad_arbol');
const contenedorQ = document.getElementById('spin_probabilidad_incendio');
const contenedorBoton = document.getElementById('simulacion');
const config = document.getElementById('panel-config');
const tablero = document.getElementById('tablero');
const panelAccion = document.getElementById('panel-accion');
const actionBtn = document.getElementById('accion');
const resetBtn = document.getElementById('reiniciar');
const infertil = 0;
const fertil = 1;
const arbol = 2;
const fuego = 3;

let bosquefuturo = [];
let bosque = [];
let bosqueDom;
let M
let N
let P
let Q

contenedorBoton.addEventListener('click', prepararTablero);
actionBtn.addEventListener('click', probabilidad);
resetBtn.addEventListener('click', simular1vez);

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

    if (1 >= Q && Q > 0) {Q = Q * 100;}
    if (1 >= P && P > 0) {P = P * 100;}

    if (isNaN(M) || isNaN(N) || M <= 0 || N <= 0) {
    alert('Introduce dimensiones válidas');
    return;
    }
    if (M > 10 || N > 10) {
        alert('Las dimensiones del bosque deben ser menores o iguales a 10');
        return;
    }
       
    config.classList.toggle('oculto');
    tablero.classList.toggle('oculto');
    panelAccion.classList.toggle('oculto');

    panelAccion.querySelector('.probabilidad').innerHTML = `<p>Probabilidad de propagación Q: ${Q}%</p><p>Probabilidad de aparición de un árbol P: ${P}%</p>`;
    
    pintarTablero();
    simular1vez();
};

function probabilidad() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (i + 1 < M && bosque[i][j] === fuego && bosque[i+1][j] === arbol ) {
                    bosque[i+1][j] = fuego;
                    bosqueDom.children[(i+1) * M + j].className = 'cell fuego';
                    return;
            }
            if (i - 1 >= 0 && bosque[i][j] === fuego && bosque[i-1][j] === arbol ) {
                    bosque[i-1][j] = fuego;
                    bosqueDom.children[(i-1) * M + j].className = 'cell fuego';
                    return;
            }
            if (j + 1 < N && bosque[i][j] === fuego && bosque[i][j+1] === arbol ) {
                    bosque[i][j+1] = fuego;
                    bosqueDom.children[i * M + (j+1)].className = 'cell fuego';
                    return;
            }
            if (j - 1 >= 0 && bosque[i][j] === fuego && bosque[i][j-1] === arbol ) {
                    bosque[i][j-1] = fuego;
                    bosqueDom.children[i * M + (j-1)].className = 'cell fuego';
                    return;
            }
            if (bosque[i][j] === infertil){bosque[i][j] = fertil; bosqueDom.children[i * M + j].className = 'cell fertil'}
            if (bosque[i][j] === fuego){bosque[i][j] = infertil; bosqueDom.children[i * M + j].className = 'cell infertil'}
        }}
}

function simular1vez() {
    for (let i = 0; i < N; i++) {
        bosque[i] = new Array(M).fill(infertil);
    }
    bosqueDom = tablero.querySelector('.tablero');
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if(Math.random() * 100 < P) {
                bosque[i][j] = arbol;
                bosqueDom.children[i * M + j].className = 'cell arbol';
            } else {
                bosque[i][j] = fertil;
                bosqueDom.children[i * M + j].className = 'cell fertil';
            }
            if(Math.random() * 100 < Q && bosque[i][j] === arbol) {
                        bosque[i][j] = fuego;
                        bosqueDom.children[i * M + j].className = 'cell fuego';
            }
        }
    }
}

