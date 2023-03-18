import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCategories, testLocations, fineDining, barsPubs, jaspers, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Location Model tests", () => {

    let barsPubsList = null;

    setup(async () => {
        db.init("mongo");
        await db.categoryStore.deleteAllCategories();
        await db.locationStore.deleteAllLocations();
        barsPubsList = await db.categoryStore.addCategory(barsPubs);
        for (let i = 0; i < testLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testLocations[i] = await db.locationStore.addLocation(barsPubsList._id, testLocations[i]);
        }
    });

    test("create single location", async () => {
        const fineDiningList = await db.categoryStore.addCategory(fineDining);
        const location = await db.locationStore.addLocation(fineDiningList._id, jaspers)
        assert.isNotNull(location._id);
        assertSubset (jaspers, location);
    });

    test("get multiple locations", async () => {
        const locations = await db.locationStore.getLocationsByCategoryId(barsPubsList._id);
        assert.equal(locations.length, testLocations.length)
    });

    test("delete all locations", async () => {
        const locations = await db.locationStore.getAllLocations();
        assert.equal(testLocations.length, locations.length);
        await db.locationStore.deleteAllLocations();
        const newLocations = await db.locationStore.getAllLocations();
        assert.equal(0, newLocations.length);
    });

    test("get a location - success", async () => {
        const fineDiningList = await db.categoryStore.addCategory(fineDining);
        const location = await db.locationStore.addLocation(fineDiningList._id, jaspers)
        const newLocation = await db.locationStore.getLocationById(location._id);
        assertSubset (jaspers, newLocation);
    });

    test("delete One Location - success", async () => {
        await db.locationStore.deleteLocation(testLocations[0]._id);
        const locations = await db.locationStore.getAllLocations();
        assert.equal(locations.length, testCategories.length - 1);
        const deletedLocation = await db.locationStore.getLocationById(testLocations[0]._id);
        assert.isNull(deletedLocation);
    });

    test("get a location - bad params", async () => {
        assert.isNull(await db.locationStore.getLocationById(""));
        assert.isNull(await db.locationStore.getLocationById());
    });

    test("delete one location - fail", async () => {
        await db.locationStore.deleteLocation("bad-id");
        const locations = await db.locationStore.getAllLocations();
        assert.equal(locations.length, testCategories.length);
    });
});