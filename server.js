const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const path = require('path');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const API_KEY = `${process.env.API_KEY_OPENWEATHER}`;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(__dirname + '/assets'));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/homepage.html'));
});

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/homepage.html'));
});

app.post('/search', async function (req, res) {
    const city = req.body.city;

    let jsonOutput = {
        "place": null,
        "weatherDays": [],
        "error": null
    };

    var response = await (getInfo(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=it&appid=${API_KEY}`))
    .catch((error) => {
        jsonOutput.error = city;
        res.render('search', jsonOutput);
        res.end();
    });

    if(response == undefined){
        console.log("Richiesta per " + city +  " : città non trovata");
        return;
    }

    const latitude = response.coord.lat;
    const longitude = response.coord.lon;

    jsonOutput.place = `${response.name}, ${response.sys.country}`;

    var response = await getForecast(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&lang=it&appid=${API_KEY}`)
    .catch((error) => {
        console.log(error);
        res.render('search', { weather: null, error: "Error" });
        res.end();
    });

    jsonOutput.weatherDays = response;

    res.render('search', jsonOutput);
    res.end();

});

app.listen(port);
console.log('Server started at http://localhost:' + port);

getInfo = async (cityUrl) => {

    try {
        const response = await axios.get(cityUrl)
        const result = response.data;
        if (result.main == undefined) {
            return Promise.reject();
        }

        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }

}

getForecast = async (forecastUrl) => {

    try {
        let output = [];
        const response = await axios.get(forecastUrl)
        const result = response.data;
        if (result.daily == undefined) {
            return Promise.reject(error);
        }

        result.daily.forEach(element => {
            var date = new Date(
                element.dt * 1000
            );
            var day = new Date(date).getDate();
            var month = new Date(date).getMonth()+1;
            var year = new Date(date).getFullYear();
            let outputObject = {
                temp: Math.round(`${element.temp.day}` - 273.15),
                description: element.weather[0].description,
                date: `${day+'/'+ month +'/'+ year}`,
                icon: `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
                _id: element.dt,
            };

            // push to output 
            output.push(outputObject);
        });

        return Promise.resolve(output);
    } catch (error) {
        return Promise.reject(error);
    }
}