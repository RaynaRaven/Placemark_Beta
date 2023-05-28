import { userApi } from "./api/user-api.js";
// eslint-disable-next-line import/named
import { categoryApi } from "./api/category-api.js";
import { locationApi } from "./api/location-api.js";

export const apiRoutes = [
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

    { method: "POST", path: "/api/categories", config: categoryApi.create },
    { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
    { method: "GET", path: "/api/categories", config: categoryApi.find },
    { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
    { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

    { method: "GET", path: "/api/locations", config: locationApi.find },
    { method: "GET", path: "/api/locations/byCategory", config: locationApi.findByCategory },
    { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
    { method: "POST", path: "/api/categories/{id}/locations", config: locationApi.create },
    { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
    { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },

];