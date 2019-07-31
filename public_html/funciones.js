var texto;
var palabra = document.getElementById("palabra");
var clasificacion = document.getElementById("clasificacion");
var iniciaConAZ = document.getElementById("iniciaConAZ");
var tieneLetras = document.getElementById("tieneLetras");
var tieneNumeros = document.getElementById("tieneNumeros");
var tieneSimbolos = document.getElementById("tieneSimbolos");
var contieneLetras = 0, contieneSimbolos = 0, contieneNumeros = 0, iniciaLetras = false;
var RELLENA_LA_CASILLA = "Rellena la casilla";
var IDENTIFICADOR = "IDENTIFICADOR";
var NUMERO = "NUMERO";
var SIMBOLO = "SIMBOLO";
var ERROR = "ERROR";
var SI = "SI(";
var NO = "NO(";
var tipo = ERROR;

/**
 * Funcion principal, encargada de verificar si el campo
 * esta vacio o no, si lo está manda un mensaje de alerta
 * al usuario
 * @returns {undefined}
 */
function reconocer(){    
    inicializarVar(); //Inicializamos variables
    if(texto == ""){
        alert(RELLENA_LA_CASILLA); //Si el campo de texto está vacío una ventana emergente te manda un mensaje
    }
    else{        
        analizarCaracteres(); // Llama a la funcion analizar caracteres
        identificarTipo(); // Llama a la funcion identificar tipo una vez analizados la cantidad de caracteres que tiene y su tipo (letra, num o simbolo)
        colocarDatosHistorial(); //Coloca los datos en el historial        
    }      
}

/**
 * Funcion encargada de inicializar variables
 * @returns {undefined}
 */
function inicializarVar(){
    texto = document.getElementById("texto").value.toString(); // Leemos la cadena en la caja de texto y la asignamos a una variable
    contieneLetras = 0, contieneSimbolos = 0, contieneNumeros = 0, iniciaLetras = false; // Inicializamos variables de tipo entero
    tipo = ERROR; // Inicializamos variables de tipo String
}

/**
 * Funcion encargada de reconocer la cantidad de carácteres por cada tipo que posee una cadena
 * Por ejemplo, "cadena5$" tiene 6 letras, 1 numero y 1 simbolo
 * @returns {undefined}
 */
function analizarCaracteres(){
        for(var i = 0; i < texto.length; i++){  // Un for que se repite dependiendo de la longitud de la palabra          
            if(texto.charCodeAt(i) > 64 && texto.charCodeAt(i) < 91 || texto.charCodeAt(i) > 96 && texto.charCodeAt(i) < 123){ // Si el carácter a evaluar es una letra minuscula o mayus lo detecta
                if(i == 0){ // Si es el primer carácter de la cadena entonces iniciaLetras = true
                    iniciaLetras = true;
                }
                contieneLetras++;// Si un caracter es reconocido como letra el contador contieneLetras lo registra
            }
            else if(texto.charCodeAt(i) > 47 && texto.charCodeAt(i) < 58){// Si no es una letra revisa si es un numero
                contieneNumeros++;//si lo es suma el contador de contieneNumeros
            }
            else{//Si no es ni letra ni numero es un simbolo
                contieneSimbolos++;// El contador de simbolos aumenta
            }
        }
}

/**
 * Funcion encargada de identificar el tipo de palabra que es segun la cantidad de caracteres
 * por cada tipo que posee
 * @returns {undefined}
 */
function identificarTipo(){
    if(iniciaLetras){//Si la cadena inicia con una letra
        if(contieneSimbolos == 0)//Revisa si no tiene simbolos, porque puede tener tanto numeros y letras sin problemas
            tipo = IDENTIFICADOR;        //Si no hay ningun simblo es de tipo IDENTIFICADOR
    }
    else{//De lo cotrario revisa si es un numero o simbolos
        if(contieneNumeros > 0 && contieneLetras == 0 && contieneSimbolos == 0)// Un numero solo puede tener numeros y por tanto si solo tiene numeros se le considera como tal
            tipo = NUMERO;// Si solo hay numeros en la cadena es de tipo NUMERO
        else if(contieneNumeros == 0 && contieneLetras == 0 && contieneSimbolos > 0)  // Si solo posee simbolos
            tipo = SIMBOLO; // Es de tipo SIMBOLOS
    }
    // NOTA: Si no es de ningún tipo de los anteriores es un ERROR
}

/**
 * Coloca las cadenas analizadas en un historial
 * @returns {undefined}
 */
function colocarDatosHistorial(){
        var tipoDeP = "<p>"; // variable que inicia un párrafo con <p>
        if(tipo == "ERROR")//Si es de tipo error
            tipoDeP = "<p class='colorRojo'>";// Le agregamos la clase colorRojo
        palabra.innerHTML = palabra.innerHTML + tipoDeP +texto + "</p>"; //En la lista de palabras/cadenas imprimimos la cadena analizada       
        clasificacion.innerHTML = clasificacion.innerHTML + tipoDeP + tipo + "</p>"; //En la lista de clasificación se coloca el tipo de cadena que es       
        iniciaConAZ.innerHTML = iniciaConAZ.innerHTML + tipoDeP + imprimirSiNo(iniciaLetras) + iniciaLetras + ")</p>"; // Si inicia con letra o no
        tieneLetras.innerHTML = tieneLetras.innerHTML + tipoDeP + imprimirSiNo(contieneLetras) + contieneLetras + ")</p>"; // En este lista se coloca si la cadena tiene letras 
        tieneNumeros.innerHTML = tieneNumeros.innerHTML + tipoDeP + imprimirSiNo(contieneNumeros) + contieneNumeros + ")</p>"; // En este lista se coloca si la cadena tiene numeros
        tieneSimbolos.innerHTML = tieneSimbolos.innerHTML + tipoDeP + imprimirSiNo(contieneSimbolos) + contieneSimbolos + ")</p>";  // En este lista se coloca si la cadena tiene simbolos       
}

/**
 * Retorna "SI" o "NO" dependiendo de los valores que le envien
 * acepta valores booleanos y enteros
 * @param {type} a
 * @returns {String}
 */
function imprimirSiNo(a){       
        if(a || a > 0)//Si es un booleano y es verdadero o si es un entero y es mayor a 0 retorna SI
            return SI;
        else//Si no retorna NO
            return NO;
}