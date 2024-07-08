// wetter.test.js
const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe('Weather Extension Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
    });

    page = await browser.newPage();

    // Grant geolocation permissions
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('file:///C:/Users/Yannick/Code/ProChroEx/popup.html', ['geolocation']);

    await page.goto('file:///C:/Users/Yannick/Code/ProChroEx/popup.html');
  });

  afterAll(async () => {
    await browser.close();
  });

  const cities = [
    { name: 'Berlin', coords: { lat: 52.52, lon: 13.405 } },
    { name: 'New York', coords: { lat: 40.7128, lon: -74.0060 } },
    { name: 'Sydney', coords: { lat: -33.8688, lon: 151.2093 } },
    { name: 'Tokyo', coords: { lat: 35.6895, lon: 139.6917 } },
    { name: 'Cairo', coords: { lat: 30.0444, lon: 31.2357 } },
    { name: 'Buenos Aires', coords: { lat: -34.6037, lon: -58.3816 } },
    { name: 'Cape Town', coords: { lat: -33.9249, lon: 18.4241 } },
    { name: 'Moscow', coords: { lat: 55.7558, lon: 37.6173 } },
    { name: 'Mumbai', coords: { lat: 19.0760, lon: 72.8777 } },
    { name: 'Sao Paulo', coords: { lat: -23.5505, lon: -46.6333 } },
    { name: 'Toronto', coords: { lat: 43.651070, lon: -79.347015 } },
    { name: 'Dubai', coords: { lat: 25.276987, lon: 55.296249 } }
  ];

  cities.forEach(city => {
    test(`Displays weather data for ${city.name}`, async () => {
      await page.setGeolocation({ latitude: city.coords.lat, longitude: city.coords.lon });
      await page.reload();

      // Warte auf den Ladebildschirm und danach auf den tatsächlichen Text
      await page.waitForFunction(() => {
        const temperatureElement = document.querySelector('#temperature');
        return temperatureElement && temperatureElement.textContent !== 'Lade Temperatur...';
      }, { timeout: 15000 });

      const temperature = await page.$eval('#temperature', el => el.textContent);
      expect(temperature).toMatch(/Derzeitige Temperatur:/);

      const countdown = await page.$eval('#countdown', el => el.textContent);
      expect(countdown).toMatch(/(Es regnet in:|Heute wird es bei dir nicht regnen :\))/);
    });
  });
});
