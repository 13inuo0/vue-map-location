import { createRouter, createWebHistory } from "vue-router";
import Map_Location from "@/views/Map_Location.vue";
import Map_marker from "@/views/Map_marker.vue";
import MapViewVue from "@/views/MapView.vue";

const routes = [
  { path: "/", component: MapViewVue },
  { path: "/marker", component: Map_marker },
  { path: "/location", component: Map_Location },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
