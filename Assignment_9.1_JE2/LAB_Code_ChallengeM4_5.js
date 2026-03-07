// Simple lookup of city → coordinates
const cityCoords = {
    "Berlin": { lat: 52.52, lon: 13.41 },
    "Oslo": { lat: 59.91, lon: 10.75 },
    "Yakutsk": { lat: 62.03, lon: 129.73 },
    "Paris": { lat: 48.85, lon: 2.35 },
    "London": { lat: 51.51, lon: -0.13 }
};

const getWeather = async function(location, info) {
    const maxWindSpeed = 15;
    const minTemp = -20;

    
    let cities = Array.isArray(location) ? location : [location];

    for (let city of cities) {
        console.log('');
        console.log(`CITY: ${city}`);

        let coords = cityCoords[city];
        if (!coords) {
            console.log("ERROR: Unknown city");
            continue;
        }

        let url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

        try {
            let response = await fetch(url);
            let data = await response.json();
            let w = data.current_weather;

            
            console.log(`WIND: ${w.windspeed} m/s, ${w.winddirection} deg`);
            if (w.windspeed > maxWindSpeed) {
                console.log(`WARNING! Wind speed over ${maxWindSpeed} m/s`);
            }

            
            console.log(`TEMP: ${w.temperature} C`);
            if (w.temperature < minTemp) {
                console.log(`WARNING! Temperature below ${minTemp} degrees`);
            }

        } catch (err) {
            console.log(`ERROR: ${err.message}`);
        }
    }
}



getWeather(["Oslo", "Yakutsk"]);