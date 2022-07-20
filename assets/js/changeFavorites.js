var request = async url => {
    const response = await fetch(url);
    return response.ok ? response.json() : Promise.reject({ error: 500 });
};

const btn0 = document.getElementById("pref0-btn");
btn0.addEventListener("click", changeFavorite);
const btn1 = document.getElementById("pref1-btn");
btn1.addEventListener("click", changeFavorite);
const btn2 = document.getElementById("pref2-btn");
btn2.addEventListener("click", changeFavorite);
const btn3 = document.getElementById("pref3-btn");
btn3.addEventListener("click", changeFavorite);

function changeFavorite(event){
    var x = event.target.id.substr(4,1);
    var newCity = document.getElementById("pref"+x+"-text").value;
    document.getElementById("pref"+x+"-text").value='';
    if(newCity !== null){
        getOneWeather(newCity,x);
    };
};

const getOneWeather = async (city_name,x) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&lang=it&appid=${API_KEY}`;
        const response = await request(url);
        localStorage.setItem("pref"+x, city_name);
        document.getElementById("pref"+x+"-city").textContent = response.name + ", " + response.sys.country;
        document.getElementById("pref"+x+"-temp").textContent = Math.round(response.main.temp) + "°C";
        document.getElementById("pref"+x+"-info").textContent = response.weather[0].description;
        document.getElementById("pref"+x+"-icon").src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    } catch (err) {
        console.error(err);
    }
};