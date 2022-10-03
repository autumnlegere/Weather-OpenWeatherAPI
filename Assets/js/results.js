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

    searchAPI(city);
};



//function to manipulate dom and add in select info from weather api to the results page
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




//function to manipulate dom and add in select info from forecast api to results page
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




// function to fetch data from weather api, return it in json, send data to results function, and run api function for forecast api
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
                errorPrint.textContent = "No results found. Please search again.";
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




// function to fetch data from forecast api, return it in json, send data to forecastResults function
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



// grabs user input and runs searchAPI function
function handleFormSubmit(event) {
    event.preventDefault();

    var userInput = document.getElementById('input').value.trim();

    if (!userInput) {
        window.alert('Please search for a city.');
        return;
    }

    searchAPI(userInput);
};

// event listener that registers submission by user and then stores search in previous searches and runs handleFormSubmit function
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var userInput = document.getElementById('input').value.trim();
  
    // Add new todoText to todos array clear the input
    searchHistory.push(userInput);
  
    // Store updated todos in localStorage, re-render the list
    storage();
    renderHistory();
    handleFormSubmit(event);
  });

// calls function to run at start of page
parameters();


// Local storage

var searchHistory = [];

// The following function renders items in previous search button elements
function renderHistory() {
  // Clear previous search element
  previousSearch.innerHTML = "";

  // Render a new button for each search
  for (var i = 0; i < searchHistory.length; i++) {
    var searches = searchHistory[i];

    var button = document.createElement("button");
    button.textContent = searches;
    button.setAttribute("data-index", i);
    button.classList.add("d-flex", "column", 'btn', 'btn-primary', 'col-4', 'm-3', 'mx-auto')

    previousSearch.appendChild(button);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored searches from localStorage
  var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedHistory !== null) {
    searchHistory = storedHistory;
  }

  // This is a helper function that will render todos to the DOM
  renderHistory();
}

function storage() {
  // Stringify and set key in localStorage to searchHistory array
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Add click event to searchHistory element
previousSearch.addEventListener("click", function(event) {
    searchAPI(event.target.innerHTML)
    // Store updated searches in localStorage, re-render the list
    storage();
    renderHistory();
});

// Calls init to retrieve data and render it to the page on load
init()