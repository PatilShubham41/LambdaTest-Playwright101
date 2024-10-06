import { Page } from "@playwright/test";

export default class HomePage {
    private readonly page: Page
    constructor(page: Page) {
        this.page = page
    };

    async selectActivity(activity: ActivityOptions) {
        await this.page.goto('/selenium-playground');
        await this.page.getByRole('link', { name: activity }).click();
    }
}


export type ActivityOptions = "Simple Form Demo" | "Drag & Drop Sliders" | "Input Form Submit"