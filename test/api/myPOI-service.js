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
};