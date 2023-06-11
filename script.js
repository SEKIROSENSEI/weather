<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .weather-app {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f2f2f2;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    h1 {
      margin-top: 0;
    }

    .search {
      margin-bottom: 20px;
    }

    .search-bar {
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    .search-button {
      padding: 6px 12px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .weather {
      margin-bottom: 20px;
    }

    .weather-info {
      margin-bottom: 10px;
    }

    .weather-icon img {
      width: 100px;
    }

    .recommendations {
      text-align: left;
    }

    .product-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 10px;
    }

    .product-item {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
    }

    .product-image {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .product-title {
      font-weight: bold;
      margin-top: 10px;
    }

    .product-price {
      margin-top: 5px;
    }

    .product-description {
      margin-top: 5px;
    }

    .product-rating {
      margin-top: 5px;
      font-style: italic;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="weather-app">
    <h1>Weather App</h1>

    <div class="search">
      <input type="text" class="search-bar" placeholder="Enter city name">
      <button class="search-button">Search</button>
    </div>

    <div class="weather">
      <div class="weather-info">
        <div class="city"></div>
        <div class="description"></div>
        <div class="temperature"></div>
        <div class="humidity"></div>
        <div class="wind"></div>
      </div>
      <div class="weather-icon"></div>
    </div>

    <div class="recommendations">
      <h2>Product Recommendations</h2>
      <div class="product-list"></div>
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
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = "Temperature: " + temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">`;
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
          this.displayProductRecommendations(data);
        })
        .catch((error) => {
          console.error("Error fetching product recommendations:", error);
        });
      },
      displayProductRecommendations: function (productData) {
        const productListElement = document.querySelector('.product-list');

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

          const productTitle = document.createElement('div');
          productTitle.classList.add('product-title');
          productTitle.innerText = product.title;
          productItem.appendChild(productTitle);

          const productPrice = document.createElement('div');
          productPrice.classList.add('product-price');
          productPrice.innerText = "Price: " + product.price;
          productItem.appendChild(productPrice);

          const productDescription = document.createElement('div');
          productDescription.classList.add('product-description');
          productDescription.innerText = product.description;
          productItem.appendChild(productDescription);

          const productRating = document.createElement('div');
          productRating.classList.add('product-rating');
          productRating.innerText = "Rating: " + product.rating;
          productItem.appendChild(productRating);

          productListElement.appendChild(productItem);
        });
      }
    };

    function searchWeather() {
      const searchInput = document.querySelector('.search-bar');
      const city = searchInput.value;
      if (city) {
        weather.fetchWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    }

    document.querySelector('.search-button').addEventListener('click', searchWeather);

    document.querySelector('.search-bar').addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        searchWeather();
      }
    });

    weather.fetchWeather("Delhi");
  </script>
</body>
</html>
