import VueRouter from "vue-router";

import HomePage from "./components/HomePage";
import GeoHashForm from "./components/GeoHashForm";
import FramesToTs from "./components/FramesToTs";

const routes = [
  { path: "/", component: HomePage },
  { path: "/geo-hash-to-kml", component: GeoHashForm },
  { path: "/frames-to-timestamp", component: FramesToTs },
];

const router = new VueRouter({
  routes,
});

export default router;
