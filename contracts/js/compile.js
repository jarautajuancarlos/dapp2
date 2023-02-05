//min 40
// modulo nativo de node 
//(tratar rutas relativas, accedemos a la ruta de MyCoin.sol)
const path = require('path');
// acciones de lectura y escritura de archivos, leemos el codigo que hemos escrito en MyCoin.sol
const fs = require('fs');
// compilador solc, cogemos el codigo de MyCoin.sol y lo compilamos
const solc = require('solc');

//accedemos a la ruta donde está el archivo
const MyCoinPath = path.join(__dirname, './MyCoin.sol')
//leemos el archivo, sync (hasta que no leemos el archivo no sigue leyendo este codigo)
// ruta y formato
const code = fs.readFileSync(MyCoinPath, 'utf8');

//compilamos en el modulo solc, configuración a modo de objeto (npm de github)
//definimos el objeto
const input = {
    // lenguaje
    language: 'Solidity',
    //nombre contrato
    sources: {
        // archivo ya declarado en la variable
        'MyCoin.sol': {
            content: code
        }
    },

        // Api, configuración, nos retorna datos del objeto
    settings: {
        outputSelection: {
            '*' : {
                '*' : ['*']
            }
        }
    }
};

// guardamos en constante el resultado de la compilación
// declaramos constante,
// lo pasamos a formato JSON (llamamos al modulo solc y compilamos)
// pasamos el objeto anterios "js" y lo transformamos en un string
// como parametro le pasamos el objeto "input"

//devuelve el "ABI", objeto que nos informa de las funciones del smartcontract,
// parametros y tipologia que recibe y los retornos, es necesario para que la libreria
// de web.3 sepa como comunicarse a la hora de llamar al smart contract.
// Para la comunicación vamos a necesitar el ABI y la dirección donde está ese contrato
// Para la compilación necesitaremos el "ByteCode"
const output = JSON.parse(solc.compile(JSON.stringify(input)));

//comprobamos en consola
// console.log(output)
//exportamos el modulo, 
module.exports = {
   //buscamos los datos de "abi" 
   abi: output.contracts['MyCoin.sol'].MyCoin.abi,
   //buscamos los datos de "bytecode"
   bytecode: output.contracts['MyCoin.sol'].MyCoin.evm.bytecode.object
}



