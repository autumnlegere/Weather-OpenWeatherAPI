/*
weather dashboard with form inputs
- css/bootstrap for layout
- html/bootstrap for form input
WHEN I search for a city THEN I am presented with current and future conditions for that city 
- form input that user can use
- user inputs city name
- javascript grabs name and saves it as variable
- variable is part of url used in fetch
- fetch url data 
- select data to show up on page using .then and response
- future conditions might require more parameters
and that city is added to the search history
- local storage
- create list items using dom manipulation
WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
- select these factors from fetch response data and use dom manipulation to display on page
- icon using fontawesome?
WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
- 
WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
- select these factors from fetch response data and use dom manipulation to display on page
- icon using fontawesome?
WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city
- list item is a link or anchor to that city in the url
```

JSON to retrieve weather data
Module 6 Activities 21-24 and 27 as project examples once solutions are pushed

link user input to url
fetch response data to url
loop through responses to create list
format what parts of response I want to show up on page and how (create elements)
prevent default when user hits search button
*/


var weatherApiKey = "9c223f342111078644baa9a6d62af6da";

var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApiKey;

fetch(queryURL)