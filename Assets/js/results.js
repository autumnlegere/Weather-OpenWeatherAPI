
var resultsContent = document.getElementById("weatherresults");
var previousSearch = document.getElementById("previous-searches")
var forecastDiv = document.getElementById("forecast-here")
var searchForm = document.getElementById("citysearch");
var userInput = document.getElementById('input').value.trim();
var weatherApiKey = "9c223f342111078644baa9a6d62af6da";
var baseIconUrl = "http://openweathermap.org/img/wn/"
var endingIconUrl = "@2x.png"



//function gets city from url and applies it as parameter for new function searchAPI
function parameters() {
    var searchParameters = document.location.search.split("&");

    var city = searchParameters[0].split("=").pop();

    searchAPI(city)
};




//function to manipulate dom and add in select info for results page
function results(resultObject) {
    console.log(resultObject);

    var resultCard = document.createElement("div");
    resultCard.classList.add("card", "wr", "d-flex", "column")

    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultCard.append(resultBody);

    var date = document.createElement("h2")
    var dateString = "(" + moment.unix(resultObject.dt).format("MM/DD/YYYY") + ")"
    var iconUrl = baseIconUrl + resultObject.weather[0].icon + endingIconUrl
    var icon = `<img src="${iconUrl}">`

    date.innerHTML = resultObject.name + " " + dateString + " " + icon
    console.log(date)

    var temperature = document.createElement("h3")
    temperature.textContent = "Temperature: " + resultObject.main.temp

    var humidity = document.createElement("h3")
    humidity.textContent = "Humidity: " + resultObject.main.humidity + "%"

    var wind = document.createElement("h3")
    wind.textContent = "Wind Speed: " + resultObject.wind.speed + " mph"

    var uvIndex = document.createElement("h3")
    // uvIndex.textContent = "UV Index: " + resultObject.value

    resultBody.append(date, temperature, humidity, wind, uvIndex)
    resultsContent.append(resultCard)
};





function forecastResults(forData) {

    var forecastCard = document.createElement("div")
    forecastCard.classList.add("card", "fs", "row", "mx-auto")

    var forecastBody = document.createElement("div")
    forecastBody.classList.add("card-body");
    forecastCard.append(forecastBody)

    var forecastDate = document.createElement("h5")
    var forecastDateString = moment.unix(forData.dt).format("MM/DD/YYYY")
    forecastDate.innerHTML = forecastDateString

    var fcPic = document.createElement("h5")
    var fcIconUrl = baseIconUrl + forData.weather[0].icon + endingIconUrl
    var fcIcon = `<img src="${fcIconUrl}">`
    fcPic.innerHTML = fcIcon

    var fcTemperature = document.createElement("p")
    fcTemperature.textContent = "Temperature: " + forData.main.temp

    var fcHumidity = document.createElement("p")
    fcHumidity.textContent = "Humidity: " + forData.main.humidity + "%"

    var fcWind = document.createElement("p")
    fcWind.textContent = "Wind Speed: " + forData.wind.speed + " mph"

    forecastBody.append(forecastDate, fcPic, fcTemperature, fcHumidity, fcWind)
    forecastDiv.append(forecastCard)
};





function searchAPI(city) {
    var searchUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    searchUrl = searchUrl + city + "&appid=" + weatherApiKey + "&units=imperial";

    fetch(searchUrl)
        .then(function (response) {
            return response.json();

        })

        .then(function (data) {
            console.log(data)
            console.log(data.cod)

            if (data.cod !== 200) {
                var errorPrint = document.createElement("h2");
                errorPrint.textContent = "No results found. Please search again."
                resultsContent.append(errorPrint);
            } else {
                resultsContent.textContent = '';
                results(data);
            }
        })

        .catch(function (error) {
            console.error(error);
        });

    searchApiForecast(city);
};





function searchApiForecast(city) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?&q=';
    forecastUrl = forecastUrl + city + "&appid=" + weatherApiKey + "&units=imperial";

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (info) {
            console.log(info)

            forecastDiv.textContent = '';
            for (var i = 7; i < info.list.length; i += 8) {
                forecastResults(info.list[i]);
            }
        })

        .catch(function (error) {
            console.error(error);
        });
};




function handleFormSubmit(event) {
    event.preventDefault();

    var userInput = document.getElementById('input').value.trim();

    if (!userInput) {
        window.alert('Please search for a city.');
        return;
    }

    searchAPI(userInput);
};



searchForm.addEventListener("submit", handleFormSubmit);

parameters();