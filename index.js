const { 
    leerInput,
    inquirerMenu,
    pausa
} = require("./helpers/inquirer")

const main= async()=> {
    let opt= null;
    
    do {
        opt= await inquirerMenu();

        switch (opt) {
            case 1:
                console.log("Que ciduad");
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