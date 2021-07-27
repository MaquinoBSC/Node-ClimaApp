const fs= require('fs');
const axios= require('axios');

class Busquedas {
    historial= [];
    dbPath= './db/database.json';

    constructor(){
        this.leerBD();
    }

    get historialCapitalizado(){
        return this.historial.map((registro)=> {
            let palabras= registro.split(' ');
            palabras= palabras.map((palabra)=> palabra[0].toUpperCase() + palabra.substring(1));

            return palabras.join(' ');
        })
    }

    get paramsMapbox(){
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": 5,
            "language": "es"
        }
    }

    get paramsOpenWeather(){
        return {
            "appid": process.env.OPENWEATHER_KEY,
            "units": "metric",
            "lang": "es",
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
            return resp.data.features.map((lugar)=> ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        } catch (error) {
            console.log(error);
            return [];
        }

        return [];//Retonar los lugares
    }


    async climaLugar(lat, lon){
        try {
            //instancia de AXIOS
            const instance= axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: {...this.paramsOpenWeather, lat, lon}
            })

            //res.data
            const res= await instance.get();
            const {weather, main}= res.data;

            return{
                desc: weather[0].description,
                min: main.temp_min, 
                max: main.temp_max, 
                temp: main.temp,
            }
        } catch (error) {
            console.log(error);
        }
    }


    agregarHistorial(lugar= ''){
        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }
        this.historial= this.historial.splice(0, 5);
        this.historial.unshift(lugar.toLowerCase());

        //Grabar en DB
        this.guardarDB();
    }

    async guardarDB(){
        try {
            const payload= {
                historial: this.historial
            };

            fs.writeFileSync(this.dbPath, JSON.stringify(payload));
        } catch (error) {
            console.log(error);
        }
    }

    leerBD(){
        if(!fs.existsSync(this.dbPath)){
            return
        }
        const info= fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data= JSON.parse(info);
        this.historial= data.historial;
    }
}

module.exports= Busquedas;