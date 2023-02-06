import VueRouter from "vue-router";

import HomePage from "./pages/HomePage";
import GeoHashForm from "./pages/GeoHashForm";
import FramesToTs from "./pages/FramesToTs";
import AddTimestamps from "./pages/AddTimestamps";

const routes = [
  { path: "/", component: HomePage },
  { path: "/geo-hash-to-kml", component: GeoHashForm },
  { path: "/frames-to-timestamp", component: FramesToTs },
  { path: "/add-timestamps", component: AddTimestamps },
];

const router = new VueRouter({
  routes,
});

export default router;
