//import { userMemStore } from "./mem/user-mem-store.js";
//import { categoryMemStore } from "./mem/category-mem-store.js";
//import { locationMemStore } from "./mem/location-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";

export const db = {
  userStore: null,
  categoryStore: null,
  locationStore: null,

  init() {
    this.userStore = userJsonStore;
    this.categoryStore = categoryJsonStore;
    this.locationStore = locationJsonStore;
  },
};