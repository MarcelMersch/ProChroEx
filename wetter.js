document.addEventListener('DOMContentLoaded', function() {
  const temperatureDiv = document.getElementById('temperature');
  const countdownDiv = document.getElementById('countdown');
  const apiKey = 'P3SGFF24ZT8AEFMV3JMWHSNH5';
// ermittle Standorte Koordinaten
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      //hole die Daten von der API ab
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/today?unitGroup=metric&key=${apiKey}&include=current,hours`)
        .then(response => response.json())
        .then(data => {
          const currentTemp = data.currentConditions.temp;
          temperatureDiv.innerHTML = `Derzeitige Temperatur: ${currentTemp}°C`;

          const date = data.days[0].datetime; // Datum von heute
// ermittle die nächste Regenzeit, und dann die Differenz zum jetzigen Zeitpunkt
          let nextRainEvent = null;
          const now = new Date();

          for (let hour of data.days[0].hours) {
            console.log('Hour data:', hour); // Log the hour data
            if (hour.conditions && hour.conditions.toLowerCase().includes('rain')) {
              const potentialRainEvent = new Date(`${date}T${hour.datetime}`);
              console.log('Parsed datetime:', potentialRainEvent); // Log the parsed datetime
              if (potentialRainEvent > now) {
                nextRainEvent = potentialRainEvent;
                break;
              }
            }
          }

          if (nextRainEvent && !isNaN(nextRainEvent.getTime())) {
            const diff = nextRainEvent - now;
            const hours = Math.floor(diff / 1000 / 60 / 60);
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            // Debugging-Logs
            console.log('Next rain event datetime:', nextRainEvent);
            console.log('Current time:', now);
            console.log('Difference in milliseconds:', diff);
            console.log('Hours:', hours, 'Minutes:', minutes);

            countdownDiv.innerHTML = `Es regnet in: ${hours} Stunden und ${minutes} Minuten`;
          } else {
            countdownDiv.innerHTML = 'Heute wird es bei dir nicht regnen :)';
          }
        })
        .catch(error => {
          temperatureDiv.innerHTML = 'Fehler beim Abrufen der Wetterdaten';
          countdownDiv.innerHTML = '';
          console.error('Fehler:', error);
        });
    }, error => {
      temperatureDiv.innerHTML = 'Fehler beim Abrufen der Geolokalisierung';
      countdownDiv.innerHTML = '';
      console.error('Geolokalisierungsfehler:', error);
    });
  } else {
    temperatureDiv.innerHTML = 'Geolokalisierung wird von deinem Browser nicht unterstützt';
    countdownDiv.innerHTML = '';
  }
});
