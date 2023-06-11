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
          // alert("Sorry! No weather found.");
    
            document.getElementsByClassName("popup")[0].classList.add("active");
        
           
         
          // for fancy alert using swalfire function in sweetalert2 plugins and bootstrap
          // Swal.fire({
          //   title: "Oops... No weather found",
          //   text: "Please Enter a valid city name",
          //   icon: "error",
          //   buttonsStyling: false,
          //   confirmButtonText: "OK",
          //   customClass: {
          //     confirmButton: "btn btn-primary",
          //   },
          // });
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
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
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x1200/?" + description + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Delhi");

document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
  document.getElementsByClassName("popup")[0].classList.remove("active");
});

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
      // JavaScript code for fetching and displaying product recommendations
      
      // Function to fetch product recommendations based on weather
      function fetchProductRecommendations(weather) {
        // Construct the API request to Amazon
        const apiEndpoint = 'amazon23.p.rapidapi.com'; // Replace with the actual API endpoint
        const apiKey = 'b2c5e88cd9mshb85873dbfc78cb2p1bc985jsn04a569d0c6a6'; // Replace with your API key
        const requestUrl = `${apiEndpoint}?weather=${weather}&api_key=${apiKey}`;
        
        // Make the API call
        fetch(requestUrl)
          .then(response => response.json())
          .then(data => {
            // Process the product data and generate HTML for recommendations
            const productListElement = document.getElementById('product-list');
            
            data.forEach(product => {
              const productItem = document.createElement('div');
              productItem.classList.add('product-item');
              
              const productImage = document.createElement('img');
              productImage.classList.add('product-image');
              productImage.src = product.image;
              productImage.alt = product.title;
              productItem.appendChild(productImage);
              
              const productDetails = document.createElement('div');
              productDetails.classList.add('product-details');
              
              const productTitle = document.createElement('h3');
              productTitle.classList.add('product-title');
              productTitle.textContent = product.title;
              productDetails.appendChild(productTitle);
              
              const productPrice = document.createElement('p');
              productPrice.classList.add('product-price');
              productPrice.textContent = product.price;
              productDetails.appendChild(productPrice);
              
              const productDescription = document.createElement('p');
              productDescription.classList.add('product-description');
              productDescription.textContent = product.description;
              productDetails.appendChild(productDescription);
              
              const productRating = document.createElement('p');
              productRating.classList.add('product-rating');
              productRating.textContent = `Rating: ${product.rating}/5`;
              productDetails.appendChild(productRating);
              
              productItem.appendChild(productDetails);
              productListElement.appendChild(productItem);
            });
          })
          .catch(error => {
            console.error('Error fetching product recommendations:', error);
          });
      }
      
      // Example usage: Fetch recommendations for "sunny" weather
      fetchProductRecommendations('sunny');
    </script>
  </body>
</html>
