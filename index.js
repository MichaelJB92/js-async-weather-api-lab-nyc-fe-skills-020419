const API_KEY = "b73756525dffd3b3cf7aad9b43f7fc9a"

function handleFormSubmit(event) {
  event.preventDefault()
const input = document.getElementById('city')
const city = input.value

fetchCurrentWeather(city)
fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=imperial')
  .then( (data) => {return data.json()})
  .then( (Json) => {displayCurrentWeather(Json)})
}

function displayCurrentWeather(Json) {
  //render current weather data to the DOM using provided IDs and json from API
  const currentTemp = Json.main.temp
  const tempDiv = document.getElementById('temp')
  tempDiv.innerHTML = currentTemp
  
  
  const low = Json.main.temp_min
  const lowDiv = document.getElementById('low')
  lowDiv.innerHTML = low
  
  
  const high = Json.main.temp_max
  const highDiv = document.getElementById('high')
  highDiv.innerHTML = high
  
  
  const humidity = Json.main.humidity
  const humidityDiv = document.getElementById('humidity')
  humidityDiv.innerHTML = humidity
  
  const cloud = Json.clouds.all
  const cloudDiv = document.getElementById('cloudCover')
  cloudDiv.innerHTML = cloud + '%'
  

}

function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_KEY + '&units=imperial')
  .then( (data) => {return data.json()})
  .then( (Json) => {displayFiveDayForecast(Json)})
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  console.log(json)
  const forecasts = json.list
  
  createChart(json)
  
  let startingString = ''
  for (let forecast of forecasts) {
    let divString = "<div> <p>" + forecast.main.temp_min + "</p>"  +
    "<p>"+ forecast.main.temp_max + "</p>" +
    "<p>" + forecast.dt_txt +" </p> </div>"
    startingString += divString
    
    
    
    
  }
  
  console.log(startingString)
  const aside = document.getElementById('five-day')
  aside.innerHTML = startingString
}

function createChart(json) {
  const ctx = document.getElementById('WeatherChart').getContext('2d');
  
  const labels =json.list.map((forecast) => {return forecast.dt_txt})
   const temps =json.list.map((forecast) => {return forecast.main.temp})
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: temps,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', handleFormSubmit)
})
