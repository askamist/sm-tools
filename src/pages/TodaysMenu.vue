<template>
  <div class="container">
    <h1 class="has-text-centered is-size-3">
      <home-button />
      Today's Menu
    </h1>

    <div class="south-indian-menu">
      <section v-if="menu.breakfast && menu.breakfast.length">
        <h2>Breakfast</h2>
        <ul>
          <li
            v-for="(item, index) in menu.breakfast"
            :key="'breakfast-' + index"
          >
            {{ item }}
          </li>
        </ul>
      </section>

      <section v-if="menu.lunch && menu.lunch.length">
        <h2>Lunch</h2>
        <ul>
          <li v-for="(item, index) in menu.lunch" :key="'lunch-' + index">
            {{ item }}
          </li>
        </ul>
      </section>

      <section v-if="menu.dinner && menu.dinner.length">
        <h2>Dinner</h2>
        <ul>
          <li v-for="(item, index) in menu.dinner" :key="'dinner-' + index">
            {{ item }}
          </li>
        </ul>
      </section>

      <button @click="generateNewMenu">Generate New Menu</button>
    </div>
  </div>
</template>

<script>
import { generateFullDayMenu } from "../menuGenerator";

export default {
  name: "SouthIndianMenu",
  data() {
    return {
      menu: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
    };
  },
  created() {
    this.generateNewMenu(); // Generate menu when component is created
  },
  methods: {
    generateNewMenu() {
      this.menu = generateFullDayMenu();
    },
  },
};
</script>

<style scoped>
.south-indian-menu {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  color: #42b983;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #349a6a;
}
</style>
