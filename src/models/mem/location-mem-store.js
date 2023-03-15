import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  async getAllLocations() {
    return locations;
  },

  async addLocation(categoryId, location) {
    location._id = v4();
    location.categoryid = categoryId;
    locations.push(location);
    return location;
  },

  async getLocationsByCategoryId(id) {
    return locations.filter((location) => location.categoryid === id);
  },

  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

  async getCategoryLocations(categoryId) {
    return locations.filter((location) => location.categoryid === categoryId);
  },

  async deleteLocation(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },

  async updateLocation(location, updatedLocation) {
    location.title = updatedLocation.title;
    location.artist = updatedLocation.artist;
    location.duration = updatedLocation.duration;
  },
};
