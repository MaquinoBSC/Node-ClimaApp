require('dotenv').config()

const { 
    leerInput,
    inquirerMenu,
    pausa
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
                const lugar= await leerInput("Ciudad: ");
                await busquedas.ciudad(lugar)
                //Mostrar los lugares
                //Seleccionar lugar
                //Datos del clima
                //Mostrar resultados
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad: ", );
                console.log("Latitud: ", );
                console.log("Longitud: ", );
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