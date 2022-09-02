var weatherApiKey = "fb8f612a496b454a85b9371bb9527629";

var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApiKey;

fetch(queryURL)