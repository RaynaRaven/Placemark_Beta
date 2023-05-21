import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const myPOIService = {
    myPOIUrl: serviceUrl,

    async createUser(user) {
        const res = await axios.post(`${this.myPOIUrl}/api/users`, user);
        return res.data;
    },

    async getUser(id) {
        const res = await axios.get(`${this.myPOIUrl}/api/users/${id}`);
        return res.data;
    },

    async getAllUsers() {
        try {
            const res = await axios.get(`${this.myPOIUrl}/api/users`);
            return res.data;
        } catch (e) {
            return null;
        }
    },

    async deleteAllUsers() {
        const res = await axios.delete(`${this.myPOIUrl}/api/users`);
        return res.data;
    },

    async createCategory(category) {
        const res = await axios.post(`${this.myPOIUrl}/api/categories`, category);
        return res.data;
    },

    async deleteAllCategories() {
        const response = await axios.delete(`${this.myPOIUrl}/api/categories`);
        return response.data;
    },

    async deleteCategory(id) {
        const response = await axios.delete(`${this.myPOIUrl}/api/categories/${id}`);
        return response;
    },

    async getAllCategories() {
        const res = await axios.get(`${this.myPOIUrl}/api/categories`);
        return res.data;
    },

    async getCategory(id) {
        const res = await axios.get(`${this.myPOIUrl}/api/categories/${id}`);
        return res.data;
    },

    async getAllLocations() {
        const res = await axios.get(`${this.myPOIUrl}/api/locations`);
        return res.data;
    },

    async createLocation(id, location) {
        const res = await axios.post(`${this.myPOIUrl}/api/categories/${id}/locations`, location);
        return res.data;
    },

    async deleteAllLocations() {
        const response = await axios.delete(`${this.myPOIUrl}/api/locations`);
        return response.data;
    },

    async deleteLocation(id) {
        const response = await axios.delete(`${this.myPOIUrl}/api/locations/${id}`);
        return response;
    },

    async getLocation(id) {
        const res = await axios.get(`${this.myPOIUrl}/api/locations/${id}`);
        return res.data;
    },

    async authenticate(user) {
        const response = await axios.post(`${this.myPOIUrl}/api/users/authenticate`, user);
        //axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        return response.data;
    },

    async clearAuth() {
        //axios.defaults.headers.common["Authorization"] = "";
        axios.defaults.headers.common.Authorization = "";
    }
};