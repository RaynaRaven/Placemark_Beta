import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { myPOIService } from "./myPOI-service.js";
import { maggieCredentials, maggie, fineDining, testCategories, testLocations, jaspers } from "../fixtures.js";

suite("Location API tests", () => {
    let user = null;
    let cheapEats = null;

    setup(async () => {
        myPOIService.clearAuth();
        user = await myPOIService.createUser(maggie);
        await myPOIService.authenticate(maggieCredentials);
        await myPOIService.deleteAllCategories();
        await myPOIService.deleteAllLocations();
        await myPOIService.deleteAllUsers();
        user = await myPOIService.createUser(maggie);
        await myPOIService.authenticate(maggieCredentials);
        fineDining.userid = user._id;
        cheapEats = await myPOIService.createCategory(fineDining);
    });

    teardown(async () => {
        await myPOIService.deleteAllUsers();
    });

    test("create location", async () => {
        const returnedLocation = await myPOIService.createLocation(cheapEats._id, jaspers);
        assertSubset(jaspers, returnedLocation);
    });

    test("create Multiple locations", async () => {
        for (let i = 0; i < testLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await myPOIService.createLocation(cheapEats._id, testLocations[i]);
        }
        const returnedLocations = await myPOIService.getAllLocations();
        assert.equal(returnedLocations.length, testLocations.length);
        for (let i = 0; i < returnedLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const location = await myPOIService.getLocation(returnedLocations[i]._id);
            assertSubset(location, returnedLocations[i]);
        }
    });

    test("Delete LocationApi", async () => {
        for (let i = 0; i < testLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await myPOIService.createLocation(cheapEats._id, testLocations[i]);
        }
        let returnedLocations = await myPOIService.getAllLocations();
        assert.equal(returnedLocations.length, testLocations.length);
        for (let i = 0; i < returnedLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const location = await myPOIService.deleteLocation(returnedLocations[i]._id);
        }
        returnedLocations = await myPOIService.getAllLocations();
        assert.equal(returnedLocations.length, 0);
    });

    test("denormalised category", async () => {
        for (let i = 0; i < testLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await myPOIService.createLocation(cheapEats._id, testLocations[i]);
        }
        const returnedCategory = await myPOIService.getCategory(cheapEats._id);
        assert.equal(returnedCategory.locations.length, testLocations.length);
        for (let i = 0; i < testLocations.length; i += 1) {
            assertSubset(testLocations[i], returnedCategory.locations[i]);
        }
    });

    // teardown(async () => {});
});