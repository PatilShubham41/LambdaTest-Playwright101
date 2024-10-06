import { Page } from "@playwright/test";

export default class FormDemoPage {

    private readonly page: Page;
    constructor(page: Page) {
        this.page = page
    };

    private readonly messageInput = () => this.page.getByPlaceholder('Please enter your Message');
    private readonly getCheckedValue = () => this.page.getByText('Get Checked Value');
    public readonly outMessage = () => this.page.locator('#message');

    async fillSingleFieldForm(message: string) {
        await this.messageInput().fill(message);
        await this.getCheckedValue().click();
    }

}