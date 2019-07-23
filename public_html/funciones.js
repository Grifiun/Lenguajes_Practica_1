var texto;
var palabra = document.getElementById("palabra");
var clasificacion = document.getElementById("clasificacion");
var iniciaConAZ = document.getElementById("iniciaConAZ");
var tieneLetras = document.getElementById("tieneLetras");
var tieneNumeros = document.getElementById("tieneNumeros");
var tieneSimbolos = document.getElementById("tieneSimbolos");
var tipo = "error";
var contieneLetras = 0, contieneSimbolos = 0, contieneNumeros = 0, iniciaLetras = false;
function reconocer(){    
    inicializarVar();
    if(texto == ""){
        alert("rellena la casilla"); 
    }
    else{
        
        for(var i = 0; i < texto.length; i++){            
            if(texto.charCodeAt(i) > 64 && texto.charCodeAt(i) < 91 || texto.charCodeAt(i) > 96 && texto.charCodeAt(i) < 123){
                if(i == 0)
                    iniciaLetras = true;
                contieneLetras++;
            }
            else if(texto.charCodeAt(i) > 47 && texto.charCodeAt(i) < 58){
                contieneNumeros++;
            }
            else
                contieneSimbolos++;
        }
        palabra.innerHTML = palabra.innerHTML + texto + "<br></br>";
        clasificacion.innerHTML = clasificacion.innerHTML + tipo + "<br></br>";
        iniciaConAZ.innerHTML = iniciaConAZ.innerHTML + iniciaLetras + "<br></br>";
        tieneLetras.innerHTML = tieneLetras.innerHTML + contieneLetras + "<br></br>";
        tieneNumeros.innerHTML = tieneNumeros.innerHTML + contieneNumeros + "<br></br>";
        tieneSimbolos.innerHTML = tieneSimbolos.innerHTML + contieneSimbolos +"<br></br>";
        texto="";
    }      
}
function inicializarVar(){
    texto = document.getElementById("texto").value.toString();
    contieneLetras = 0, contieneSimbolos = 0, contieneNumeros = 0, iniciaLetras = false;
}
