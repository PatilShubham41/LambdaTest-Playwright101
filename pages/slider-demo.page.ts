import { Page } from "@playwright/test";


export default class SliderDemoPage {

    constructor(private readonly page: Page) {

    }

    private readonly silderDefault15 = () => this.page.locator('#slider3').getByRole('slider');
    public readonly silderDefault15Val = () => this.page.locator('#rangeSuccess');

    async slide(value: string) {
        this.silderDefault15().fill(value);
    }

}
