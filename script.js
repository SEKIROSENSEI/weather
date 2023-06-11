<!DOCTYPE html>
<html>
<head>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f3f3f3;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .weather-container {
      text-align: center;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .city {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .icon {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      display: block;
    }

    .description {
      font-size: 18px;
      margin: 10px 0;
    }

    .temp, .humidity, .wind {
      margin-bottom: 5px;
    }

    .product-recommendations {
      margin-top: 20px;
    }

    .product-item {
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
    }

    .product-image {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }

    .product-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .product-price {
      font-size: 16px;
      margin-bottom: 5px;
    }

    .product-description {
      margin-bottom: 5px;
    }

    .product-rating {
      font-style: italic;
    }

    .popup {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    .popup.active {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .popup-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }

    .popup h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .popup p {
      margin-bottom: 10px;
    }

    .popup button {
      padding: 10px 20px;
      background-color: #2196F3;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
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
    <h3>Product
