import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Category",
        category: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addLocation: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newLocation = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
      };
      await db.locationStore.addLocation(category._id, newLocation);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deleteLocation: {
    handler: async function(request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.locationStore.deleteLocation(request.params.locationId);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
