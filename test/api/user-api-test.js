import { assert } from "chai";
import { myPOIService } from "./myPOI-service.js";
import { assertSubset } from "../test-utils.js";
import {maggie, testUsers} from "../fixtures.js";

suite("User API tests", () => {
    setup(async () => {
        await myPOIService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testUsers[i] = await myPOIService.createUser(testUsers[i]);
        }
    });
    teardown(async () => {
    });

    test("create a user", async () => {
        const newUser = await myPOIService.createUser(maggie);
        assertSubset(maggie, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all users", async () => {
        let returnedUsers = await myPOIService.getAllUsers();
        assert.equal(returnedUsers.length, 3);
        await myPOIService.deleteAllUsers();
        returnedUsers = await myPOIService.getAllUsers();
        assert.equal(returnedUsers.length, 0);
    });

    test("get a user - success", async () => {
        const returnedUser = await myPOIService.getUser(testUsers[0]._id);
        assert.deepEqual(testUsers[0], returnedUser);
    });
});