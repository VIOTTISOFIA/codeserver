const suma = (n1, n2) => {}

let contadorPruebasOk = 0
let contadorTotal = 0

function test1() {
    contadorTotal++
    console.log("TEST 1: devuelve null si algun parametro no es numerico");
    const test = suma("2", 2)
    if ( test === null) {
        console.log("TEST 1: OK! ");
        contadorPruebasOk++
    } else {
        console.log("TEST 1: FALLO! "); 
    }

}
test1()

console.log("PRUEBAS OK: "+ contadorPruebasOk);
