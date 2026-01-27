import { expect, test } from '@playwright/test';
import { DummyPage } from '../pages/DummyPage';

test.describe('Suite Dummy Page (POM)', () => {
  test('@positivo muestra saludo al enviar nombre', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.submitName('Camila');

    await expect(dummyPage.formMessage).toHaveText('Hola, Camila!');
    await expect(dummyPage.formMessage).toHaveClass(/success/);
  });

  test('@positivo incrementa el contador', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.incrementCounter(3);

    await expect(dummyPage.counterValue).toHaveText('3');
  });

  test('@negativo muestra error si el nombre está vacío', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.submitEmptyForm();

    await expect(dummyPage.formMessage).toHaveText('El nombre es obligatorio.');
    await expect(dummyPage.formMessage).toHaveClass(/error/);
  });
});
