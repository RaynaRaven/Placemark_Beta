import { assert } from "chai";
import { myPOIService } from "./myPOI-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers} from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
    setup(async () => {
        await myPOIService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            users[0] = await myPOIService.createUser(testUsers[i]);
        }
    });
    teardown(async () => {});

    test("create a user", async () => {
        const newUser = await myPOIService.createUser(maggie);
        assertSubset(maggie, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all userApi", async () => {
        let returnedUsers = await myPOIService.getAllUsers();
        assert.equal(returnedUsers.length, 3);
        await myPOIService.deleteAllUsers();
        returnedUsers = await myPOIService.getAllUsers();
        assert.equal(returnedUsers.length, 0);
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
        try {
            const returnedUser = await myPOIService.getUser(users[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});