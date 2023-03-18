import { assert } from "chai";
import { myPOIService } from "./myPOI-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggieCredentials, maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
    setup(async () => {
        myPOIService.clearAuth();
        await myPOIService.createUser(maggie);
        await myPOIService.authenticate(maggieCredentials);
        await myPOIService.deleteAllUsers();
    });

    test("authenticate", async () => {
        const returnedUser = await myPOIService.createUser(maggie);
        const response = await myPOIService.authenticate(maggieCredentials);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("verify Token", async () => {
        const returnedUser = await myPOIService.createUser(maggie);
        const response = await myPOIService.authenticate(maggieCredentials);

        const userInfo = decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });

    test("check Unauthorized", async () => {
        myPOIService.clearAuth();
        try {
            await myPOIService.deleteAllUsers();
            assert.fail("Route not protected");
        } catch (error) {
            assert.equal(error.response.data.statusCode, 401);
        }
    });
});