import axios from "axios";

import { serviceUrl } from "../fixtures.js";

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
        const res = await axios.get(`${this.myPOIUrl}/api/users`);
        return res.data;
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
};