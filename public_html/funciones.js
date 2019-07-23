var texto;
var palabra = document.getElementById("palabra");
var clasificacion = document.getElementById("clasificacion");
var iniciaConAZ = document.getElementById("iniciaConAZ");
var tieneLetras = document.getElementById("tieneLetras");
var tieneNumeros = document.getElementById("tieneNumeros");
var tieneSimbolos = document.getElementById("tieneSimbolos");
var tipo = "ERROR";
var contieneLetras = 0, contieneSimbolos = 0, contieneNumeros = 0, iniciaLetras = false;
function reconocer(){    
    inicializarVar();
    if(texto == ""){
        alert("rellena la casilla"); 
    }
    else{        
        analizarCaracteres();
        identificarTipo();
        colocarDatosHistorial();
        
    }      
}
function inicializarVar(){
    texto = document.getElementById("texto").value.toString();
    contieneLetras = 0, contieneSimbolos = 0, contieneNumeros = 0, iniciaLetras = false;
    tipo = "ERROR";
}
function analizarCaracteres(){
        for(var i = 0; i < texto.length; i++){            
            if(texto.charCodeAt(i) > 64 && texto.charCodeAt(i) < 91 || texto.charCodeAt(i) > 96 && texto.charCodeAt(i) < 123){
                if(i == 0){
                    iniciaLetras = true;
                }
                contieneLetras++;
            }
            else if(texto.charCodeAt(i) > 47 && texto.charCodeAt(i) < 58){
                contieneNumeros++;
            }
            else{
                contieneSimbolos++;
            }
        }
}
function identificarTipo(){
    if(iniciaLetras){
        if(contieneSimbolos == 0)
            tipo = "IDENTIFICADOR";        
    }
    else{
        if(contieneNumeros > 0 && contieneLetras == 0 && contieneSimbolos == 0)
            tipo = "NUMERO";
        else if(contieneNumeros == 0 && contieneLetras == 0 && contieneSimbolos > 0) 
            tipo = "SIMBOLOS";
    }
}
function colocarDatosHistorial(){
        var tipoDeP = "<p>";
        if(tipo == "ERROR")
            tipoDeP = "<p class='colorRojo'>";
        palabra.innerHTML = palabra.innerHTML + tipoDeP +texto + "</p>";        
        clasificacion.innerHTML = clasificacion.innerHTML + tipoDeP + tipo + "</p>";        
        iniciaConAZ.innerHTML = iniciaConAZ.innerHTML + tipoDeP + imprimirSiNo(iniciaLetras) + iniciaLetras + ")</p>";
        tieneLetras.innerHTML = tieneLetras.innerHTML + tipoDeP + imprimirSiNo(contieneLetras) + contieneLetras + ")</p>";
        tieneNumeros.innerHTML = tieneNumeros.innerHTML + tipoDeP + imprimirSiNo(contieneNumeros) + contieneNumeros + ")</p>";
        tieneSimbolos.innerHTML = tieneSimbolos.innerHTML + tipoDeP + imprimirSiNo(contieneSimbolos) + contieneSimbolos + ")</p>";        
}
function imprimirSiNo(a){       
        if(a || a > 0)
            return "SI_(";
        else
            return "NO_(";
}