# 7-Day Weather Forecast Widget
A responsive, interactive web application that displays a 7-day weather forecast for Calgary, Alberta. Built with vanilla JavaScript, Tailwind CSS v4, and WeatherAPI.com.

## Features
* **7-Day Forecast Display:** Downloads and renders daily weather forecast data using asynchronous JavaScript (`async/await`).
* **Temperature Unit Toggle:** Allows users to switch between Celsius (°C) and Fahrenheit (°F) with instant updates.
* **Dynamic Weather Icons:** Uses a `switch` statement to render matching SVG weather icons based on WeatherAPI condition codes.
* **Responsive Layout:** Mobile-friendly grid built with Tailwind CSS that adapts across small, medium, and large screens.
* **Error Handling & Loading States:** Displays user-friendly loading indicators and error messages if network requests fail.

## Tech Stack
* **HTML5:** Dynamic page structure and semantic elements.
* **JavaScript (ES6+):** DOM manipulation, Fetch API, and asynchronous control flow.
* **Tailwind CSS v4:** Utility-first styling and dynamic grid layouts.
* **WeatherAPI.com:** Public REST API providing forecast data.

## File Structure

```Weather-forcast
├── index.html          # Main HTML structure
├── app.js              # Core application logic, API fetching, and DOM rendering
├── styles.css          # Tailwind compiled stylesheet
├── src/
│   └── input.css       # Tailwind input CSS file
├── package.json        # Dependencies and build scripts
└── README.md           # Project documentation

```

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/Hannahkasper/weather-forecast.git
cd weather-forecast

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run Tailwind CSS dev server:**
```bash
npm run dev

```


4. **Open `index.html**` in your browser or run a live server to test the app.

## Credits & Attributions

* **Weather Data:** Provided by [WeatherAPI.com](https://www.weatherapi.com/).
* **Icons & Styling:** Custom SVGs styled with [Tailwind CSS](https://tailwindcss.com/).

## AI Usage Disclosure

AI was used during development as a learning tool to brainstorm page layouts, map condition codes to SVG icons, and resolve JavaScript date time-zone formatting issues. All submitted code was tested, evaluated, and verified using Chrome DevTools. Full reflection details can be found in `weather_forcast_Ai_reflection`.