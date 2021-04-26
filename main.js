'use strict'

const nodoBtnEmpezar  = document.querySelector('#empezar'); 
const nodoBtnPausar   = document.querySelector('#parar');  
const nodoManecillaSg = document.querySelector('#manecilla-seg'); 
const nodoManecillaCs = document.querySelector('#manecilla-cent'); 
const nodoCentesimas  = document.querySelector('#centesimas'); 
const nodoSegundos    = document.querySelector('#segundos'); 
const nodoMinutos     = document.querySelector('#minutos'); 

//unidades
var centesimas = 0; 
var segundos   = 0; 
var minutos    = 0; 
var gradosSeg  = 0; 
var gradosCent = 0; 

let ref_Centesimas; 
let ref_Segundos; 
let ref_Minutos; 
let ref_ManecillasSg; 
let ref_ManecillasCtn; 

nodoBtnEmpezar.addEventListener('click', ()=>{
    activarBtn( nodoBtnPausar ); 
    pulsarBtn( nodoBtnEmpezar ); 
    iniciarCronometro(); 
    desactivarBtn( nodoBtnEmpezar ); 
})

nodoBtnPausar.addEventListener('click', ()=>{
    activarBtn( nodoBtnEmpezar )
    pulsarBtn( nodoBtnPausar ); 
    pararCronometro(); 
    desactivarBtn( nodoBtnPausar ); 
})

function pulsarBtn(boton){
    let clase; 
    switch (boton) {
        case nodoBtnPausar:
            clase = 'pulsado2'; 
            break;
        default:
            clase = 'pulsado1'; 
            break;
    }
    boton.classList.add( clase ); 
    let refTimeOut = setTimeout(() => {
        boton.classList.remove( clase ); 
    }, 200);
}

function desactivarBtn( boton ){
    boton.disabled = true; 
}

function activarBtn( boton ){
    boton.disabled = false; 
}

function calcularTiempo( unidad, nodo, maxContador, tiempoUnidad ){
    let refInterval = setInterval( ()=>{
       window[unidad]++;
       let valor_unidad = window[unidad];
        if( valor_unidad > maxContador ){
            window[unidad] = 0; 
        }
        if( valor_unidad.toString().length ===1 ){
            nodo.innerHTML = `0${valor_unidad}`; 
        } else{
            nodo.innerHTML = valor_unidad; 
        }
    }, tiempoUnidad)
    return refInterval; 
}

function moverManecillas( grados, manecilla, tiempo, vueltas ){ 
    manecilla.style.transformOrigin = 'bottom'; 
    let refInterval = setInterval( ()=>{
        window[grados] += getGrados( vueltas );
        let value_grados = window[grados]
        manecilla.style.transform = `rotate(${value_grados}deg)`; 
    }, tiempo)
    return refInterval; 
}

function getGrados( movimientos ){
    return 360 / movimientos; 
}

function iniciarCronometro(){
    ref_Centesimas    = calcularTiempo( "centesimas", nodoCentesimas, 99, 10, ref_Centesimas );
    ref_Segundos      = calcularTiempo( "segundos", nodoSegundos, 59, 1000, ref_Segundos ); 
    ref_Minutos       = calcularTiempo( "minutos", nodoMinutos, 59, 60000, ref_Minutos ); 
    ref_ManecillasCtn = moverManecillas( "gradosSeg", nodoManecillaCs , 10, 100); 
    ref_ManecillasSg  = moverManecillas( "gradosCent", nodoManecillaSg, 1000, 60); 
}

function  pararCronometro(){
    clearInterval(ref_Centesimas); 
    clearInterval(ref_Segundos); 
    clearInterval(ref_Minutos); 
    clearInterval(ref_ManecillasCtn); 
    clearInterval(ref_ManecillasSg); 
}