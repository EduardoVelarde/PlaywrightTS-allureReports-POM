import { Locator, Page } from '@playwright/test';
import path from 'path';

export class DummyPage {
  readonly page: Page;
  readonly title: Locator;
  readonly nameInput: Locator;
  readonly submitButton: Locator;
  readonly formMessage: Locator;
  readonly counterValue: Locator;
  readonly incrementButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('#title');
    this.nameInput = page.locator('#nameInput');
    this.submitButton = page.locator('#submitBtn');
    this.formMessage = page.locator('#formMessage');
    this.counterValue = page.locator('#counterValue');
    this.incrementButton = page.locator('#incrementBtn');
  }

  async goto(): Promise<void> {
    const filePath = path.resolve(__dirname, '..', 'fixtures', 'dummy.html');
    await this.page.goto(`file://${filePath}`);
  }

  async submitName(name: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.submitButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.nameInput.fill('');
    await this.submitButton.click();
  }

  async incrementCounter(times = 1): Promise<void> {
    for (let i = 0; i < times; i += 1) {
      await this.incrementButton.click();
    }
  }
}
