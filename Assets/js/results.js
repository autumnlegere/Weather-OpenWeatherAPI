
var resultsContent = document.getElementById("weatherresults");
var searchForm = document.getElementById("citysearch");
var userInput = document.getElementById('input').value.trim();
var weatherApiKey = "9c223f342111078644baa9a6d62af6da";



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
    resultCard.classList.add("card", "bc", "m-5", "d-flex", "column")

    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultCard.append(resultBody);

    //convert unix to mm/dd/yyyy and weather id to icon????
    var date = document.createElement("h2")
    date.textContent = resultObject.name, resultObject.dt, resultObject.weather.icon
    //var dateString = moment.unix(1661870592).format("MM/DD/YYYY")

    var temperature = document.createElement("h3")
    temperature.textContent = resultObject.main.temp

    var humidity = document.createElement("h3")
    humidity.textContent = resultObject.main.humidity

    var uvIndex = document.createElement("h3")
    uvIndex.textContent = resultObject.value

    resultBody.append(title, temperature, humidity, uvIndex)
    resultsContent.append(resultCard)
}

function searchAPI(city) {
    // var searchURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + weatherApiKey + "&units=imperial";

    var searchUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  
    searchUrl = searchUrl + city + "&appid=" + weatherApiKey + "&units=imperial"; 
    
    fetch(searchUrl)

        .then(function (response) {
            console.log(response)

            return response.json;
        
        })

        .then(function (data) {
            // if (!data.results.length) {
            // resultsContent.innerHTML = '<h3>No results found, please search again.</h3>';

            
            // not sure if I need the for loop ...
            // } else {
                resultsContent.textContent = '';
                for (var i = 0; i < data.results.length; i++) {
                results(data.results[i]);
                }
            // }
        })

        .catch(function (error) {
            console.error(error);
        });
}

function handleFormSubmit(event) {
    event.preventDefault();

    var userInput = document.getElementById('input').value.trim();

    if (!userInput) {
        window.alert('Please search for a city.');
        return;
    }

    searchAPI(userInput);

}

searchForm.addEventListener("submit", handleFormSubmit);

parameters();