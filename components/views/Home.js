import html from "html-literal";
import axios from "axios";
import store from "../../store/Home.js";

export default state => html`
  <section id="jumbotron">
    <h2>SavvyCoders JavaScript Fullstack Bootcamp</h2>
    <a href="index.html">"Call to Action" "Button"</a>
  </section>
  <h3>
    The weather in ${state.weather.city} is ${state.weather.description}.
    Temperature is ${state.weather.temp}F, and it feels like
    ${state.weather.feelsLike}F.
  </h3>
`;

export const beforeRouterHook = (done, params) => {
  axios
    // Get request to retrieve the current weather data using the API key and providing a city name
    .get(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
    )
    .then(response => {
      // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
      const kelvinToFahrenheit = kelvinTemp =>
        Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

      // console.log(response.data);
      // Create an object to be stored in the Home state from the response
      store.weather = {
        city: response.data.name,
        temp: kelvinToFahrenheit(response.data.main.temp),
        feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
        description: response.data.weather[0].main
      };

      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
};
