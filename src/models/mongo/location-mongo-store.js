import { Location } from "./location.js";

export const locationMongoStore = {
    async getAllLocations() {
        const locations = await Location.find().lean();
        return locations;
    },

    async addLocation(categoryId, location) {
        location.categoryid = categoryId;
        const newLocation = new Location(location);
        const locationObj = await newLocation.save();
        return this.getLocationById(locationObj._id);
    },

    async getLocationsByCategoryId(id) {
        const locations = await Location.find({ categoryid: id }).lean();
        return locations;
    },

    async getLocationById(id) {
        if (id) {
            const location = await Location.findOne({ _id: id }).lean();
            return location;
        }
        return null;
    },

    async deleteLocation(id) {
        try {
            await Location.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllLocations() {
        await Location.deleteMany({});
    },

    async updateLocation(location, updatedLocation) {
        const locationDoc = await Location.findOne({ _id: location._id });
        locationDoc.name = updatedLocation.name;
        locationDoc.description = updatedLocation.description;
        locationDoc.location = updatedLocation.location;
        await locationDoc.save();
    },
};