"use strict";
const forecastContainer = document.getElementById("forecast");
const statusMessage = document.getElementById("status");
const unitToggle = document.getElementById("unit-toggle");
let isCelsius = true;
let forecastDays = [];
const API_KEY = "063d533bf2f344c0a0e02315262310";
const LOCATION = "51.08,-114.08";
async function getForecast() {
    if (!statusMessage)
        return;
    statusMessage.textContent = "Loading forecast...";
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        forecastDays = data.forecast.forecastday;
        statusMessage.textContent = `Forecast for ${data.location.name}, ${data.location.region}`;
        displayForecast();
    }
    catch (error) {
        console.error("Failed to retrieve weather data:", error);
        if (statusMessage) {
            statusMessage.textContent = "Could not load the forecast. Please check your API configuration.";
        }
    }
}
function getWeatherIcon(code) {
    switch (code) {
        case 1000: // Sunny / Clear
            return `<svg class="w-10 h-10 text-amber-400 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
        case 1003: // Partly cloudy
            return `<svg class="w-10 h-10 text-sky-300 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h11a5 5 0 00-.1-9.99 5.002 5.002 0 10-9.78 2.09A4.001 4.001 0 003 15z"></path></svg>`;
        case 1006:
        case 1009: // Cloudy / Overcast
            return `<svg class="w-10 h-10 text-slate-400 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h11a5 5 0 00-.1-9.99 5.002 5.002 0 10-9.78 2.09A4.001 4.001 0 003 15z"></path></svg>`;
        case 1063:
        case 1183: // Rain / Showers
            return `<svg class="w-10 h-10 text-blue-400 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 16.2A4.5 4.5 0 0017.5 8h-1.8A7 7 0 104 14.9M16 13v6m-4-2v6m-4-4v6"></path></svg>`;
        case 1114:
        case 1213: // Snow
            return `<svg class="w-10 h-10 text-indigo-200 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m9-9H3m15.364 6.364l-12.728-12.728m0 12.728l12.728-12.728"></path></svg>`;
        default: // Default fallback icon
            return `<svg class="w-10 h-10 text-slate-300 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h11a5 5 0 00-.1-9.99 5.002 5.002 0 10-9.78 2.09A4.001 4.001 0 003 15z"></path></svg>`;
    }
}
function displayForecast() {
    if (!forecastContainer)
        return;
    forecastContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    forecastDays.forEach((day) => {
        const temperature = isCelsius ? day.day.avgtemp_c : day.day.avgtemp_f;
        const unit = isCelsius ? "°C" : "°F";
        const iconSvg = getWeatherIcon(day.day.condition.code);
        const card = document.createElement("article");
        
        card.className = "bg-slate-700/40 hover:bg-slate-700/70 border border-slate-600/40 transition-all duration-200 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-between shadow-sm hover:shadow-lg text-center min-w-0";

        const formattedDate = new Date(day.date + "T12:00:00").toLocaleDateString("en-CA", {
            weekday: "short",
        });
        card.innerHTML = `
      <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">${formattedDate}</h3>
      <div class="my-2 flex items-center justify-center">
        ${iconSvg}
      </div>
      <p class="text-xs text-slate-400 capitalize my-1 line-clamp-2">${day.day.condition.text}</p>
      <p class="text-lg font-bold text-white mt-2">${Math.round(temperature)}<span class="text-indigo-400 font-normal">${unit}</span></p>
    `;
        fragment.appendChild(card);
    });
    forecastContainer.appendChild(fragment);
}
if (unitToggle) {
    unitToggle.addEventListener("click", () => {
        isCelsius = !isCelsius;
        unitToggle.textContent = isCelsius ? "Switch to °F" : "Switch to °C";
        displayForecast();
    });
}
getForecast();
