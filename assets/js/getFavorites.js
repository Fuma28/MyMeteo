const cities_std = ["Londra", "Tokyo", "Roma", "Berlino"];

var request = async url => {
    const response = await fetch(url);
    return response.ok ? response.json() : Promise.reject({ error: 500 });
};


const getWeather = async (id, city_name) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&lang=it&appid=${API_KEY}`;
        const response = await request(url);
        document.getElementById("pref"+id+"-city").textContent = response.name + ", " + response.sys.country;
        document.getElementById("pref"+id+"-temp").textContent = Math.round(response.main.temp) + "°C";
        document.getElementById("pref"+id+"-info").textContent = response.weather[0].description;
        document.getElementById("pref"+id+"-icon").src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    } catch (err) {
        console.error(err);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    var cities = new Array(); 
    for (let index = 0; index < 4; index++) {
        var city = localStorage.getItem("pref"+index);
        if(city == null){
            city = cities_std[index];
        }
        cities.push(city);
    };
    for (let index = 0; index < 4; index++) {
        getWeather(index, cities[index])
    };
});

