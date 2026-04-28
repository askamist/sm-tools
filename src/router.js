import VueRouter from "vue-router";
import AddTimestamps from "./pages/AddTimestamps";
import FramesToTs from "./pages/FramesToTs";
import GeoHashForm from "./pages/GeoHashForm";
import HomePage from "./pages/HomePage";
import IntervalTimer from "./pages/IntervalTimer";
import TodaysMenu from "./pages/TodaysMenu";

const routes = [
	{ path: "/", component: HomePage },
	{ path: "/geo-hash-to-kml", component: GeoHashForm },
	{ path: "/frames-to-timestamp", component: FramesToTs },
	{ path: "/add-timestamps", component: AddTimestamps },
	{ path: "/todays-menu", component: TodaysMenu },
	// { path: "/interval-timer", component: IntervalTimer },
];

const router = new VueRouter({
	routes,
});

export default router;
