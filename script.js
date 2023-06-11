<!DOCTYPE html>
<html>
<head>
  <style>
    /* CSS styles for the recommendation section */
    /* ... */
  </style>
</head>
<body>
  <div class="recommendation-container">
    <h2 class="recommendation-heading">Product Recommendations</h2>
    <div id="product-list"></div>
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
        // Display weather information
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
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x1200/?" + description + "')";
      },
      fetchProductRecommendations: function (weatherDescription) {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint for your backend server or proxy
        const apiEndpoint = 'https://amazon23.p.rapidapi.com/product-details';

        // Make an API call to your backend server or proxy to retrieve Amazon product recommendations based on the weather description
        fetch(apiEndpoint + '?weather=' + weatherDescription)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching product recommendations.");
          }
          return response.json();
        })
        .then((data) => {
          // Display the Amazon product recommendations
          this.displayProductRecommendations(data);
        })
        .catch((error) => {
          console.error("Error fetching product recommendations:", error);
        });
      },
      displayProductRecommendations: function (productData) {
        const productListElement = document.getElementById('product-list');

        // Clear the existing product list
        productListElement.innerHTML = '';

        // Iterate over the product data and generate HTML elements for each product
        productData.forEach((product) => {
          const productItem = document.createElement('div');
          productItem.classList.add('product-item');

          const productImage = document.createElement('img');
          productImage.classList.add('product-image');
          productImage.src = product.image;
          productImage.alt = product.title;
          productItem.appendChild(productImage);

          const productDetails = document.createElement('div');
          productDetails.classList.add
