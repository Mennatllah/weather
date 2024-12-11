const searchInput = document.getElementById("search");
const weatherContainer = document.getElementById("weather");

searchInput.addEventListener("input", () => {
  const city = searchInput.value.trim();
  if (city.length > 2) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=be03cb690ebc4d3f84e230250240812&q=${city}&days=3&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error("API Error:", data.error.message);
      resetWeatherInfo();
      return;
    }

    updateWeatherInfo(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    resetWeatherInfo();
  }
}

function updateWeatherInfo(data) {
  const forecastDays = data.forecast.forecastday;

  document.querySelector(".par1 .day1").textContent = new Date(
    forecastDays[0].date
  ).toLocaleDateString("en", { weekday: "long" });

  document.querySelector(".par1 .date").textContent =
    new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" });

  document.querySelector(".par1 .location1").textContent = data.location.name;
  document.querySelector(
    ".par1 .num"
  ).innerHTML = `${forecastDays[0].day.avgtemp_c}<sup>o</sup>C`;

  document.querySelector(
    ".par1 .sun img"
  ).src = `https:${data.current.condition.icon}`;
  document.querySelector(".par1 .custom").textContent =
    data.current.condition.text;

  document.querySelector(".par2 .day1").textContent = new Date(
    forecastDays[1].date
  ).toLocaleDateString("en", { weekday: "long" });
  document.querySelector(
    ".par2 .num"
  ).innerHTML = `${forecastDays[1].day.maxtemp_c}<sup>o</sup>C`;
  document.querySelector(
    ".par2 .humidity"
  ).textContent = `${forecastDays[1].day.mintemp_c}°`;
  document.querySelector(
    ".par2 .cloud img"
  ).src = `https:${forecastDays[1].day.condition.icon}`;
  document.querySelector(".par2 .text").textContent =
    forecastDays[1].day.condition.text;

  document.querySelector(".par3 .day1").textContent = new Date(
    forecastDays[2].date
  ).toLocaleDateString("en", { weekday: "long" });
  document.querySelector(
    ".par3 .num"
  ).innerHTML = `${forecastDays[2].day.maxtemp_c}<sup>o</sup>C`;
  document.querySelector(
    ".par3 .humidity"
  ).textContent = `${forecastDays[2].day.mintemp_c}°`;
  document.querySelector(
    ".par3 .cloud img"
  ).src = `https:${forecastDays[2].day.condition.icon}`;
  document.querySelector(".par3 .text").textContent =
    forecastDays[2].day.condition.text;
}

function resetWeatherInfo() {
  document.querySelector(".par1 .day1").textContent = "";
  document.querySelector(".par1 .date").textContent = "";
  document.querySelector(".par1 .location1").textContent = "No Data";
  document.querySelector(".par1 .num").innerHTML = "--";
  document.querySelector(".par1 .sun img").src = "";
  document.querySelector(".par1 .custom").textContent = "";

  document.querySelector(".par2 .day1").textContent = "";
  document.querySelector(".par2 .num").innerHTML = "--";
  document.querySelector(".par2 .humidity").textContent = "--";
  document.querySelector(".par2 .cloud img").src = "";
  document.querySelector(".par2 .text").textContent = "";

  document.querySelector(".par3 .day1").textContent = "";
  document.querySelector(".par3 .num").innerHTML = "--";
  document.querySelector(".par3 .humidity").textContent = "--";
  document.querySelector(".par3 .cloud img").src = "";
  document.querySelector(".par3 .text").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Cairo");
});

setInterval(() => {
  fetchWeather("Cairo");
}, 3600000);
