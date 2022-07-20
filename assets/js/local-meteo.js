const API_KEY = '893659fbe4f5dfbb6499a4c2b0e8ad50'
// function to request data
var request = async url => {
    const response = await fetch(url);
    return response.ok ? response.json() : Promise.reject({ error: 500 });
};

// function to get data with a request
const getWeatherInfo = async (latitude, longitude) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&lang=it&appid=${API_KEY}`;
        const response = await request(url);
        document.getElementById("today-degrees").textContent = Math.round(response.daily[0].temp.day) + "°C";
        document.getElementById("today-description").textContent = response.daily[0].weather[0].description;
        document.getElementById("today-img").src = `http://openweathermap.org/img/wn/${response.daily[0].weather[0].icon}@2x.png`

        document.getElementById("tomorrow-degrees").textContent = Math.round(response.daily[1].temp.day) + "°C";
        document.getElementById("tomorrow-description").textContent = response.daily[1].weather[0].description;
        document.getElementById("tomorrow-img").src = `http://openweathermap.org/img/wn/${response.daily[1].weather[0].icon}@2x.png`

        document.getElementById("day-after-degrees").textContent = Math.round(response.daily[2].temp.day) + "°C";
        document.getElementById("day-after-description").textContent = response.daily[2].weather[0].description;
        document.getElementById("day-after-img").src = `http://openweathermap.org/img/wn/${response.daily[2].weather[0].icon}@2x.png`
    } catch (err) {
        console.error(err);
    }
};

// after document loaded, get data if user grant consent to its device position 
document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getWeatherInfo(latitude, longitude);
    });
});



