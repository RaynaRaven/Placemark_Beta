import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  locationStore: null,

  init() {
    this.userStore = userMemStore;
    this.categoryStore = categoryMemStore;
    this.locationStore = locationMemStore;
  },
};
