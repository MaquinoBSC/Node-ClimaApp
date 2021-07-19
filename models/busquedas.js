const axios= require('axios');

class Busquedas {
    historial= ['Chimalhuacan', "Madrid", "San Jose"];

    constructor(){
        //TODO: leer db si existe
    }

    get paramsMapbox(){
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": 5,
            "language": "es"
        }
    }

    //Buscar una ciudad
    async ciudad(lugar= ''){
        try {
            //Peticion http
            const instance= axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                params: this.paramsMapbox,
            });

            const resp= await instance.get();
            console.log(resp.data);
        } catch (error) {
            console.log(error);
            return [];
        }

        return [];//Retonar los lugares
    }
}

module.exports= Busquedas;