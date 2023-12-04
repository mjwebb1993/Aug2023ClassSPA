import html from "html-literal";
import axios from "axios";
import store from "../../store/Pizza.js";

export default state => html`
  <section id="pizza">
    <table id="pizzas">
      <tr>
        <th>Crust</th>
        <th>Cheese</th>
        <th>Sauce</th>
        <th>Toppings</th>
        <th>Customer</th>
      </tr>

      ${state.pizzas
        .map(pizza => {
          return `<tr><td>${pizza.crust}</td><td>${pizza.cheese}</td><td>${
            pizza.sauce
          }</td><td>${pizza.toppings.join(" & ")}</td><td>${
            pizza.customer
          }</td></tr>`;
        })
        .join("")}
    </table>
  </section>
`;

export const beforeRouterHook = (done, params) => {
  // New Axios get request utilizing already made environment variable
  axios
    .get(`${process.env.PIZZA_PLACE_API_URL}/pizzas`)
    .then(response => {
      // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
      store.pizzas = response.data;
      done();
    })
    .catch(error => {
      console.log("It puked", error);
      done();
    });
};
