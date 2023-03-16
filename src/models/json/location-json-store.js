import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/locations.json"));
db.data = { locations: [] };

export const locationJsonStore = {
    async getAllLocations() {
        await db.read();
        return db.data.locations;
    },

    async addLocation(categoryId, location) {
        await db.read();
        location._id = v4();
        location.categoryid = categoryId;
        db.data.locations.push(location);
        await db.write();
        return location;
    },

    async getLocationsByCategoryId(id) {
        await db.read();
        return db.data.locations.filter((location) => location.categoryid === id);
    },

    async getLocationById(id) {
        await db.read();
        return db.data.locations.find((location) => location._id === id);
    },

    async deleteLocation(id) {
        await db.read();
        const index = db.data.locations.findIndex((location) => location._id === id);
        db.data.locations.splice(index, 1);
        await db.write();
    },

    async deleteAllLocations() {
        db.data.locations = [];
        await db.write();
    },

    async updateLocation(location, updatedLocation) {
        location.name = updatedLocation.name;
        location.description = updatedLocation.description;
        location.location = updatedLocation.location;
        await db.write();
    },
};