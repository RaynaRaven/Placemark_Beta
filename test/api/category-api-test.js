import { EventEmitter } from "events";
import { assert } from "chai";
import { myPOIService } from "./myPOI-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, fineDining, testCategories } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {

    let user = null;

    setup(async () => {
        await myPOIService.deleteAllCategories();
        await myPOIService.deleteAllUsers();
        user = await myPOIService.createUser(maggie);
        fineDining.userid = user._id;
    });

    teardown(async () => {});

    test("create category", async () => {
        const returnedCategory = await myPOIService.createCategory(fineDining);
        assert.isNotNull(returnedCategory);
        assertSubset(fineDining, returnedCategory);
    });

    test("delete a category", async () => {
        const category = await myPOIService.createCategory(fineDining);
        const response = await myPOIService.deleteCategory(category._id);
        assert.equal(response.status, 204);
        try {
            const returnedCategory = await myPOIService.getCategory(category.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
        }
    });

    test("create multiple categories", async () => {
        for (let i = 0; i < testCategories.length; i += 1) {
            testCategories[i].userid = user._id;
            // eslint-disable-next-line no-await-in-loop
            await myPOIService.createCategory(testCategories[i]);
        }
        let returnedLists = await myPOIService.getAllCategories();
        assert.equal(returnedLists.length, testCategories.length);
        await myPOIService.deleteAllCategories();
        returnedLists = await myPOIService.getAllCategories();
        assert.equal(returnedLists.length, 0);
    });

    test("remove non-existent category", async () => {
        try {
            const response = await myPOIService.deleteCategory("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
        }
    });
});