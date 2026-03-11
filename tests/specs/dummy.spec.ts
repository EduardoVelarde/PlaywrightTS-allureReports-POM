import { expect, test } from '@playwright/test';
import { DummyPage } from '../pages/DummyPage';

test.describe('Suite Dummy Page (POM)', () => {
  test('@positivo carga la página principal con el título correcto', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await expect(dummyPage.title).toHaveText('Página Dummy');
  });

  test('@positivo muestra el contador inicial en 0', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await expect(dummyPage.counterValue).toHaveText('0');
  });

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

  test('@negativo muestra error si el nombre contiene solo espacios', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.submitName('   ');

    await expect(dummyPage.formMessage).toHaveText('El nombre es obligatorio.');
    await expect(dummyPage.formMessage).toHaveClass(/error/);
  });

  test('@negativo no incrementa el contador al enviar el formulario', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.submitName('Camila');

    await expect(dummyPage.counterValue).toHaveText('0');
  });
});
