import { assert } from "chai";
import { myPOIService } from "./myPOI-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers} from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {

    setup(async () => {
        myPOIService.clearAuth();
        await myPOIService.createUser(maggie);
        await myPOIService.authenticate(maggie);
        await myPOIService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            users[0] = await myPOIService.createUser(testUsers[i]);
        }
        await myPOIService.createUser(maggie);
        await myPOIService.authenticate(maggie);
    });

    teardown(async () => {});

    test("create a user", async () => {
        const newUser = await myPOIService.createUser(maggie);
        assertSubset(maggie, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all userApi", async () => {
        let returnedUsers = await myPOIService.getAllUsers();
        assert.equal(returnedUsers.length, 4);
        await myPOIService.deleteAllUsers();
        await myPOIService.createUser(maggie);
        await myPOIService.authenticate(maggie);
        returnedUsers = await myPOIService.getAllUsers();
        assert.equal(returnedUsers.length, 1);
    });

    test("get a user", async () => {
        const returnedUser = await myPOIService.getUser(users[0]._id);
        assert.deepEqual(users[0], returnedUser);
    });

    test("get a user - bad id", async () => {
        try {
            const returnedUser = await myPOIService.getUser("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            // assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a user - deleted user", async () => {
        await myPOIService.deleteAllUsers();
        await myPOIService.createUser(maggie);
        await myPOIService.authenticate(maggie);
        try {
            const returnedUser = await myPOIService.getUser(users[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});