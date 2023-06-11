<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add your CSS styles here */
  </style>
</head>
<body>
  <div class="weather-container">
    <h2 class="city"></h2>
    <div class="weather-details">
      <img class="icon" src="" alt="">
      <p class="description"></p>
      <p class="temp"></p>
      <p class="humidity"></p>
      <p class="wind"></p>
    </div>
  </div>

  <div class="product-recommendations">
    <h3>Product Recommendations</h3>
    <div id="product-list"></div>
  </div>

  <div class="popup">
    <div class="popup-content">
      <h2>No weather found</h2>
      <p>Please enter a valid city name.</p>
      <button id="dismiss-popup-btn">Dismiss</button>
    </div>
  </div>

  <script>
    let weather = {
      apiKey: "5b47c3f40d1e22ba16d5c99894178e9f",
      fetchWeather: function (city) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
        )
        .then((response) => {
          if (!response.ok) {
            document.getElementsByClassName("popup")[0].classList.add("active");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => {
          this.displayWeather(data);
          this.fetchProductRecommendations(data.weather[0].description);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });
      },
      displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = name + ", " + country;
        document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
          "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
          "Wind speed: " + speed + " km/h";
        document.querySelector(".weather-container").classList.remove("loading");
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x1200/?" + description + "')";
      },
      fetchProductRecommendations: function (weatherDescription) {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint for your backend server or proxy
        const apiEndpoint = 'amazon23.p.rapidapi.com';

        // Make an API call to your backend server or proxy to retrieve Amazon product recommendations based on the weather description
        fetch(apiEndpoint + '?weather=' + weatherDescription)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error fetching product recommendations.");
            }
            return response.json();
          })
          .then((data) => {
            this.displayProductRecommendations(data);
          })
          .catch((error) => {
            console.error("Error fetching product recommendations:", error);
          });
      },
      display
