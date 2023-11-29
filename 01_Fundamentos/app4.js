
console.log('Inicio de programa');

setTimeout( () => {
    console.log('Primer Timeout');
}, 3000 );


setTimeout( () => {
    console.log('Segundo Timeout');
}, 0 );


setTimeout( () => {
    console.log('Tercer Timeout');
}, 0 );


console.log('Fin de programa');


// Event Loop
// 1. callbacks (funciones que se ejecutan después de un tiempo).
// 2. Promesas.
// 3. Async/Await.
// Pila de ejecución (Call Stack)

// versionamiento semantico = 1.7.2 (version mayor, version menor, parche)
// 1.7.3 (version mayor, nuevas características, solución de bugs)
