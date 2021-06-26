var dateEl = document.querySelector("#current-date");
var dayOneE1 = document.querySelector("#dayOne");
var dayTwoE1 = document.querySelector("#dayTwo");
var dayThreeE1 = document.querySelector("#dayThree");
var dayFourE1 = document.querySelector("#dayFour");
var dayFiveE1 = document.querySelector("#dayFive");
var cityInputEl = document.querySelector("#city");
var cityFormEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");


//variables for Current Date
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvindexEl = document.querySelector("#uvindex");


//variables for One Day Ahead
var tempOneEl = document.querySelector("#tempOne");
var windOneEl = document.querySelector("#windOne");
var humidityOneEl = document.querySelector("#humidityOne");
var weatherIconOneE1 = document.querySelector("#weather-icon-one");

//variables for Two Days Ahead
var tempTwoEl = document.querySelector("#tempTwo");
var windTwoEl = document.querySelector("#windTwo");
var humidityTwoEl = document.querySelector("#humidityTwo");
var weatherIconTwoE1 = document.querySelector("#weather-icon-two");

//variables for Three Days Ahead
var tempThreeEl = document.querySelector("#tempThree");
var windThreeEl = document.querySelector("#windThree");
var humidityThreeEl = document.querySelector("#humidityThree");
var weatherIconThreeE1 = document.querySelector("#weather-icon-three");

//variables for Four Days Ahead
var tempFourEl = document.querySelector("#tempFour");
var windFourEl = document.querySelector("#windFour");
var humidityFourEl = document.querySelector("#humidityFour");
var weatherIconFourE1 = document.querySelector("#weather-icon-four");

//variables for Five Days Ahead
var tempFiveEl = document.querySelector("#tempFive");
var windFiveEl = document.querySelector("#windFive");
var humidityFiveEl = document.querySelector("#humidityFive");
var weatherIconFiveE1 = document.querySelector("#weather-icon-five");


//Get current date and append it at te top of the page
var date = moment().format('MM/DD/YYYY ');
dateEl.textContent = date;
//Get date 5 days ahead
dayOneE1.textContent = moment().add(1, 'days').format('MM/DD/YYYY ');
dayTwoE1.textContent = moment().add(2, 'days').format('MM/DD/YYYY ');
dayThreeE1.textContent = moment().add(3, 'days').format('MM/DD/YYYY ');
dayFourE1.textContent = moment().add(4, 'days').format('MM/DD/YYYY ');
dayFiveE1.textContent = moment().add(5, 'days').format('MM/DD/YYYY ');



//Displays the Weather Info on the page
var displayWeatherInfo = function(info) {

    tempEl.textContent = info.current.temp;
    humidityEl.textContent = info.current.humidity;
    uvindexEl.textContent = info.current.uvi;
    windEl.textContent = info.current.wind_speed;
    uvindexEl.classList.add("badge");
    uvindexEl.classList.add("bg-success");


    tempOneEl.textContent = info.daily[0].temp.day;
    humidityOneEl.textContent = info.daily[0].humidity;
    windOneEl.textContent = info.daily[0].wind_speed;
    weatherIconOneE1.setAttribute("src", "http://openweathermap.org/img/wn/" + info.daily[0].weather[0].icon + "@2x.png");

    


    tempTwoEl.textContent = info.daily[1].temp.day;
    humidityTwoEl.textContent = info.daily[1].humidity;
    windTwoEl.textContent = info.daily[1].wind_speed;
    weatherIconTwoE1.setAttribute("src", "http://openweathermap.org/img/wn/" + info.daily[1].weather[0].icon + "@2x.png");


    tempThreeEl.textContent = info.daily[2].temp.day;
    humidityThreeEl.textContent = info.daily[2].humidity;
    windThreeEl.textContent = info.daily[2].wind_speed;
    weatherIconThreeE1.setAttribute("src", "http://openweathermap.org/img/wn/" + info.daily[2].weather[0].icon + "@2x.png");

    tempFourEl.textContent = info.daily[3].temp.day;
    humidityFourEl.textContent = info.daily[3].humidity;
    windFourEl.textContent = info.daily[3].wind_speed;
    weatherIconFourE1.setAttribute("src", "http://openweathermap.org/img/wn/" + info.daily[3].weather[0].icon + "@2x.png");

    tempFiveEl.textContent = info.daily[4].temp.day;
    humidityFiveEl.textContent = info.daily[4].humidity;
    windFiveEl.textContent = info.daily[4].wind_speed;
    weatherIconFiveE1.setAttribute("src", "http://openweathermap.org/img/wn/" + info.daily[4].weather[0].icon + "@2x.png");
    
};


//Pulls the weather information from the website and passes it to be displayed
var getWeatherInfo = function(lat, lon) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=fc879f5526d7b281a6dba47b040f7417";


    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            displayWeatherInfo(data);
          });
        } else {
          alert("Error: City Not Found");
        }
      })
  
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });

};

//Function that gets the longitude and latitude when given the city and passes it to the next function
var getLatLon = function(city) {
    // format the gei api url
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=fc879f5526d7b281a6dba47b040f7417";
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeatherInfo(lat, lon);
          });

        } else {
          alert("Error: City Not Found");
        }
      })
  
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
      });

    
};



//Function that listens for if the submit button is clicked and passes it to another function that gets the longitude and latitude
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();
    cityNameEl.textContent = city;
    if (city) {
        getLatLon(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);







