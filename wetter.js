document.addEventListener('DOMContentLoaded', function() {
  const temperatureDiv = document.getElementById('temperature');
  const countdownDiv = document.getElementById('countdown');
  const apiKey = 'P3SGFF24ZT8AEFMV3JMWHSNH5';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/today?unitGroup=metric&key=${apiKey}&include=current,hours`)
        .then(response => response.json())
        .then(data => {
          const currentTemp = data.currentConditions.temp;
          temperatureDiv.innerHTML = `Derzeitige Temperatur: ${currentTemp}°C`;

          let nextRainEvent = null;
          for (let hour of data.days[0].hours) {
            if (hour.conditions && hour.conditions.toLowerCase().includes('rain')) {
              nextRainEvent = new Date(hour.datetime);
              break;
            }
          }

          if (nextRainEvent) {
            const now = new Date();
            const diff = nextRainEvent - now;
            const hours = Math.floor(diff / 1000 / 60 / 60);
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / 1000 / 60);
            countdownDiv.innerHTML = `Es regnet in: ${hours} Stunden und ${minutes} Minuten`;
          } else {
            countdownDiv.innerHTML = 'Heute wird es bei dir nicht regnen :)';
          }
        })
        .catch(error => {
          temperatureDiv.innerHTML = 'Error fetching weather data';
          countdownDiv.innerHTML = '';
          console.error('Error:', error);
        });
    }, error => {
      temperatureDiv.innerHTML = 'Error fetching geolocation';
      countdownDiv.innerHTML = '';
      console.error('Geolocation Error:', error);
    });
  } else {
    temperatureDiv.innerHTML = 'Geolocation not supported by your browser';
    countdownDiv.innerHTML = '';
  }
});
