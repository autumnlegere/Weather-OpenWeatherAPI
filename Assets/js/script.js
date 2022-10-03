var weatherApiKey = "9c223f342111078644baa9a6d62af6da";
var searchForm = document.getElementById("citysearch");

// grabs user input and sends user to results.html
function handleSubmit(event) {
    event.preventDefault();

    var userInput = document.getElementById('input').value.trim();

    if (!userInput) {
        window.alert('Please search for a city.');
        return;
    }

    var urlString = "./results.html?q=" + userInput + "&appid=" + weatherApiKey + "&units=imperial";

    location.assign(urlString);
}

// listens for submittion of form
searchForm.addEventListener('submit', handleSubmit);

