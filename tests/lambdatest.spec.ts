import { expect } from "@playwright/test";
import { faker } from '@faker-js/faker'
import test from '../fixtures/lamdaTest.fixture';
import { FormDetails } from "../pages/input-form.page";


test('Test Scenario 1', async ({ page, homePage, formPage }) => {
    await homePage.selectActivity("Simple Form Demo");
    await expect(page).toHaveURL(/simple-form-demo/);
    const message = 'Welcome to LambdaTest'
    await formPage.fillSingleFieldForm(message);
    await expect(formPage.outMessage()).toHaveText(message);
});

test('Test Scenario 2', async ({ sliderPage, homePage }) => {
    const valToBeSet = '85'
    homePage.selectActivity('Drag & Drop Sliders');
    await sliderPage.slide(valToBeSet);
    await expect(sliderPage.silderDefault15Val()).toHaveText(valToBeSet, {timeout: 10_000});
});

test('Test Scenario 3', async ({ inputFormPage, homePage }) => {
    const formDetails: FormDetails = {
        Name: faker.person.fullName(),
        Email: faker.internet.email(),
        Password: faker.internet.password(),
        Company: faker.company.name(),
        Website: 'www.example.com',
        City: faker.location.city(),
        Address_1: faker.location.streetAddress(),
        Address_2: faker.location.secondaryAddress(),
        State: faker.location.state(),
        Zip_code: faker.location.zipCode()
    }
    await homePage.selectActivity("Input Form Submit");
    await inputFormPage.fillForm(formDetails, "United States");
    await expect(inputFormPage.successMsg()).toHaveText('Thanks for contacting us, we will get back to you shortly.');
})

