
    const apiKey = "BqIrA5np3i1shc8kBzrAYAhSgrM3Kf9G"; 
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&timesteps=1h&apikey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const hours = data.timelines.hourly;
        const tbody = document.getElementById("forecast");

        hours.forEach(hour => {
          const dt = new Date(hour.time);
          const date = dt.toLocaleDateString();
          const time = dt.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
          const temp = hour.values.temperature.toFixed(1);
          const condition = hour.values.weatherCode;

          // Weather code mapping
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