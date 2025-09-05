  // This is where they use the API key and everything else that gets into the table
    const apiKey = ""; // API key from https://docs.tomorrow.io/reference/weather-forecast between the brackets
    
    function loadWeather() {
      const location = document.getElementById("location").value;
      const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1h&apikey=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const hours = data.timelines.hourly.slice(0, 10); // top 10 results
          const tbody = document.getElementById("forecast");
          tbody.innerHTML = ""; // clear old results

          hours.forEach(hour => {
            const dt = new Date(hour.time);
            const date = dt.toLocaleDateString();
            const time = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
            const temp = hour.values.temperature.toFixed(1);
            const condition = hour.values.weatherCode;

            const conditionsMap = {
              1000: "Clear",
              1100: "Mostly Clear",
              1101: "Partly Cloudy",
              1102: "Cloudy",
              2000: "Fog",
              2100: "Light Fog",
              4000: "Drizzle",
              4001: "Rain",
              4200: "Light Rain",
              4201: "Heavy Rain",
              5000: "Snow",
              5001: "Flurries",
              5100: "Light Snow",
              5101: "Heavy Snow",
              6000: "Freezing Drizzle",
              6001: "Freezing Rain",
              6200: "Light Freezing Rain",
              6201: "Heavy Freezing Rain",
              7000: "Ice Pellets",
              7101: "Heavy Ice Pellets",
              7102: "Light Ice Pellets",
              8000: "Thunderstorm"
            };

            const row = `<tr>
              <td>${date}</td>
              <td>${time}</td>
              <td>${temp}</td>
              <td>${conditionsMap[condition] || "Unknown"}</td>
            </tr>`;
            tbody.innerHTML += row;
          });
        })
        .catch(error => {
          console.error("Error:", error);
          document.getElementById("forecast").innerHTML = 
            `<tr><td colspan="4">Error fetching weather data.</td></tr>`;
        });
    }

    window.onload = loadWeather;