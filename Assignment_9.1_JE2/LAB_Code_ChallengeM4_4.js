
const cityCoords = {
    "Berlin": { lat: 52.52, lon: 13.41 },
    "Oslo": { lat: 59.91, lon: 10.75 },
    "Yakutsk": { lat: 62.03, lon: 129.73 },
    "Paris": { lat: 48.85, lon: 2.35 },
    "London": { lat: 51.51, lon: -0.13 }
};

let getWeather = function(location, info) {
    const maxWindSpeed = 15;
    const minTemp = -20;

  
    let cities = Array.isArray(location) ? location : [location];


    let promises = cities.map(city => {
        let coords = cityCoords[city];
        if(!coords) {
          
            return Promise.resolve({ city, error: "Unknown city" });
        }

      
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

        return fetch(url)
            .then(res => res.json())
            .then(data => {
                return { city, weather: data.current_weather };
            })
            .catch(err => ({ city, error: err.message }));
    });


    Promise.all(promises)
        .then(results => {
            for (let r of results) {
                console.log('');
                console.log(`CITY: ${r.city}`);

                if(r.error) {
                    console.log(`ERROR: ${r.error}`);
                    continue;
                }

                let w = r.weather;

                
                console.log(`WIND: ${w.windspeed} m/s, ${w.winddirection} deg`);
                if (w.windspeed > maxWindSpeed) {
                    console.log(`WARNING! Wind speed over ${maxWindSpeed} m/s`);
                }

                
                console.log(`TEMP: ${w.temperature} C`);
                if (w.temperature < minTemp) {
                    console.log(`WARNING! Temperature below ${minTemp} degrees`);
                }
            }
        })
        .catch(err => console.log("Fetch error:", err.message));
}



getWeather("Oslo");
