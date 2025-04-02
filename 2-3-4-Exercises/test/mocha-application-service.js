const assert = require("assert");
const { default: ApplicationService } = require("../lib/ApplicationService");

it("should have name key", function () {
    assert.notEqual(ApplicationService.getAppInfo().name, undefined);
});

it("should have description key", function () {
    assert.notEqual(ApplicationService.getAppInfo().description, undefined);
});

it("should have version key", function () {
    assert.notEqual(ApplicationService.getAppInfo().version, undefined);
});

it("should have version number composed only of numbers and dots", function () {
    const permitted = ".0123456789";
    const numbersAndDotsCount = Array.from(ApplicationService.getAppInfo().version).reduce(
        (acc, char) => (acc + (permitted.includes(char) ? 1 : 0)),
        0
    );
    assert.equal(numbersAndDotsCount, ApplicationService.getAppInfo().version.length);
});
