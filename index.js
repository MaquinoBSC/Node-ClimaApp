require('dotenv').config()

const { 
    leerInput,
    inquirerMenu,
    pausa,
    listarLugares
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main= async()=> {
    let opt= null;

    const busquedas= new Busquedas();

    do {
        opt= await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino= await leerInput("Ciudad: ");
                //Mostrar los lugares
                const lugares= await busquedas.ciudad(termino);
                //Seleccionar lugar
                const id= await listarLugares(lugares);
                const lugarSeleccionado= lugares.find((lugar)=> lugar.id === id);
                //Datos del clima
                //Mostrar resultados
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad: ", lugarSeleccionado.nombre);
                console.log("Latitud: ", lugarSeleccionado.lng);
                console.log("Longitud: ", lugarSeleccionado.lat);
                console.log("Temperatura: ", );
                console.log("Temperatura maxima: ", );
                console.log("Temperatura minima: ", );
                break;
            
            case 2:
                console.log("Tu historial");
                break;
            
            case 0:
                console.log("Salir");
                break
            
            default:
                break;
        }

        if(opt !== 0){
            await pausa();
        }

    } while (opt !== 0);

}

main();