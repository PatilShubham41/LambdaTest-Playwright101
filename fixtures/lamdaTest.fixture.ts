
import * as base from "@playwright/test";
import path from "path";
import { chromium } from "playwright";
import HomePage from "../pages/home.page";
import FormDemoPage from "../pages/form-demo.page";
import SliderDemoPage from "../pages/slider-demo.page";
import InputFormPage from "../pages/input-form.page";

// LambdaTest capabilities
const capabilities = {
    browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 10",
        build: "Playwright LambdaTest Build",
        name: "Playwright Test",
        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        network: true,
        video: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
    },
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName: string , testName: string) => {
    let config = configName.split("@lambdatest")[0];
    let [browserName, browserVersion, platform] = config.split(":");
    capabilities.browserName = browserName
        ? browserName
        : capabilities.browserName;
    capabilities.browserVersion = browserVersion
        ? browserVersion
        : capabilities.browserVersion;
    capabilities["LT:Options"]["platform"] = platform
        ? platform
        : capabilities["LT:Options"]["platform"];
    capabilities["LT:Options"]["name"] = testName;
};

type AppPages = {
    homePage: HomePage,
    formPage: FormDemoPage,
    sliderPage: SliderDemoPage,
    inputFormPage: InputFormPage

}

const test = base.test.extend<AppPages>({
    page: async ({ page, playwright }, use, testInfo) => {
        // Configure LambdaTest platform for cross-browser testing
        let fileName = testInfo.file.split(path.sep).pop();
        if (testInfo.project.name.match(/lambdatest/)) {
            modifyCapabilities(
                testInfo.project.name,
                `${testInfo.title} - ${fileName}`
            );

            const browser = await chromium.connect({
                wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                    JSON.stringify(capabilities)
                )}`,
            });

            const ltPage = await browser.newPage(testInfo.project.use);
            await use(ltPage);

            const testStatus = {
                action: "setTestStatus",
                arguments: {
                    status: testInfo.status,
                    remark: testInfo.error?.stack || testInfo.error?.message,
                },
            };
            await ltPage.evaluate(() => { },
                `lambdatest_action: ${JSON.stringify(testStatus)}`);
            await ltPage.close();
            await browser.close();
        } else {
            // Run tests in local in case of local config provided
            await use(page);
        }
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    formPage: async ({ page }, use) => {
        await use(new FormDemoPage(page))
    },
    sliderPage: async ({ page }, use) => {
        await use(new SliderDemoPage(page));
    },
    inputFormPage: async ({ page }, use) => {
        await use(new InputFormPage(page));
    }


});

export default test;