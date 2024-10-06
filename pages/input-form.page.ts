import { Page } from "@playwright/test";

export default class InputFormPage {

    constructor(private readonly page: Page) { };

    private readonly formFields = (placeHolder: string) => this.page.getByPlaceholder(placeHolder.replace('_', ' '), { exact: true })
    private readonly submitButton = () => this.page.getByRole('button', { name: 'Submit' });
    private readonly selectState = async (state: State) => await this.page.locator('select[name="country"]').selectOption({ label: state })
    public readonly successMsg = () => this.page.getByRole('paragraph').and(this.page.locator('.success-msg'))


    async fillForm(formDetails: FormDetails, state: State) {
        for (const placeHolder in formDetails) {
            await this.formFields(placeHolder).fill(formDetails[placeHolder]);
        }
        await this.selectState(state);
        await this.submitButton().click();
    }

}

export type FormDetails = {
    Name: string;
    Email: string;
    Password: string;
    Company: string;
    Website: string;
    City: string;
    Address_1: string;
    Address_2: string;
    State: string;
    Zip_code: string;

}

export type State = "United States"
