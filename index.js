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

                if(id===0) continue;

                const lugarSeleccionado= lugares.find((lugar)=> lugar.id === id);
                //Guardar en DB
                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                
                //Datos del clima
                const clima= await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
                //Mostrar resultados
                console.clear();
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad: ", lugarSeleccionado.nombre.green);
                console.log("Latitud: ", String(lugarSeleccionado.lat).green);
                console.log("Longitud: ", String(lugarSeleccionado.lng).green);
                console.log("Temperatura: ", String(clima.temp).green);
                console.log("Temperatura maxima: ", String(clima.max).green);
                console.log("Temperatura minima: ", String(clima.min).green);
                console.log("Como esta el clima: ", clima.desc.green);
                break;
            
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, index)=> {
                    const idx= `${index + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
            
            case 0:
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