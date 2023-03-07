
const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},NL&units=metric&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");
        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        div.setAttribute("id", "conditions");
        let country = document.createElement("h1");
        let countryNode = document.createTextNode(data.sys.country);
        country.appendChild(countryNode);

        let temp = document.createElement("div");
        let tempNode = document.createTextNode("\t"+data.main.temp + " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("div");
        let descNode = document.createTextNode("| \t   "+data.weather[0].description);
        desc.appendChild(descNode);

        let humidity = document.createElement("div");
        let humidityNode = document.createTextNode("| \t   Humidity: " + data.main.humidity + "%");
        humidity.appendChild(humidityNode);

        let windSpeed = document.createElement("div");
        let windSpeedNode = document.createTextNode(`Wind Speed: ${data.wind.speed} m/s`);
        windSpeed.appendChild(windSpeedNode);
  
        let windDirection = document.createElement("div");
        let windDirectionNode = document.createTextNode(`Wind Direction: ${data.wind.deg} degrees`);
        windDirection.appendChild(windDirectionNode);

        let rise = document.createElement("div");
        let riseNode = document.createTextNode("| \t   "+new Date(data.sys.sunrise * 1000).toLocaleTimeString());
        rise.appendChild(riseNode)

        let icon = document.createElement("img");
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        icon.setAttribute("alt", data.weather[0].description);


        div.appendChild(city);
        div.appendChild(country);
        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(rise);
        div.appendChild(humidity);
        div.appendChild(windSpeed);
        div.appendChild(windDirection);
        div.appendChild(icon);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}


document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let selectedCity = document.getElementById("city").value;
        if(selectedCity != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(selectedCity);
        }else{
            console.log("You must select a city");
        }
    })
})


anime.timeline({loop: true})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

  