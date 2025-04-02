const puppeteer = require("puppeteer");
const { spawn } = require("node:child_process");
const assert = require("assert");

before(async function () {
    const server = spawn("node ./index.js", [], { shell: true });

    await new Promise((resolve, reject) => {
        server.stdout.on("data", (data) => {
            if (data.toString().includes("Server listening on port 8080")) {
                console.log("Server is ready!");
                resolve();
            }
        });
    });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:8080/");

    await page.setViewport({ width: 1080, height: 1024 });

    const usernameDiv = await page.locator("#username").waitHandle();
    const fullText = await usernameDiv?.evaluate((el) => el.textContent);

    it("should describe user's username", function () {
        assert.equal(fullText.includes("Your username is "), true);
    });

    await browser.close();

    server.stdin.pause();
    server.kill();
});
