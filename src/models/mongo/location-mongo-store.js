import { Location } from "./location.js";

export const locationMongoStore = {
    async getLocationsByCategoryId(id) {
        const locations = await Location.find({ categoryid: id }).lean();
        return locations;
    },
};

