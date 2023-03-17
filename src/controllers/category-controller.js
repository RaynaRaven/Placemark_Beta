import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("category-view", { title: "Add track error", errors: error.details }).takeover().code(400);
      },
    },
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
