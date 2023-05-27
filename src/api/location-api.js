import Boom from "@hapi/boom";
import { db } from "../models/db.js";
// import { IdSpec, LocationSpec, LocationSpecPlus, LocationArraySpec } from "../models/joi-schemas.js";
// import { validationError } from "./logger.js";

export const locationApi = {
    find: {
        auth: {
          strategy: "jwt",
        },
        // auth: false,
        handler: async function (request, h) {
            try {
                console.log("INSPECT2!",request.query.categoryId);
                const locations = await db.locationStore.getLocationsByCategoryId(request.query.categoryId);
                return locations;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        // response: { schema: LocationArraySpec, failAction: validationError },
        description: "Get locations by Cat Id",
        notes: "Returns all locations by Cat Id",
    },

    findOne: {
        auth: false,
        async handler(request) {
            try {
                const location = await db.locationStore.getLocationById(request.params.id);
                if (!location) {
                    return Boom.notFound("No location with this id");
                }
                return location;
            } catch (err) {
                return Boom.serverUnavailable("No location with this id");
            }
        },
        tags: ["api"],
        description: "Find a Location",
        notes: "Returns a location",
        // validate: { params: { id: IdSpec }, failAction: validationError },
        // response: { schema: LocationSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        // auth: false,
        handler: async function (request, h) {
            try {
                // console.log("INCOMING CREATE LOC PAYLOAD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", request)
                const location = await db.locationStore.addLocation(request.payload.categoryId, request.payload);
                if (location) {
                    return h.response(location).code(201);
                }
                return Boom.badImplementation("error creating location");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a location",
        notes: "Returns the newly created location",
        // validate: { payload: LocationSpec },
        // response: { schema: LocationSpecPlus, failAction: validationError },
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            try {
                await db.locationStore.deleteAllLocations();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all locationApi",
    },

    deleteOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const location = await db.locationStore.getLocationById(request.params.id);
                if (!location) {
                    return Boom.notFound("No Location with this id");
                }
                await db.locationStore.deleteLocation(location._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Location with this id");
            }
        },
        tags: ["api"],
        description: "Delete a location",
        // validate: { params: { id: IdSpec }, failAction: validationError },
    },
};