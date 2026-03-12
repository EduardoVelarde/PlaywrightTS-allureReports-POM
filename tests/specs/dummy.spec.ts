import { expect, test } from '@playwright/test';
import { AllureReportUtils } from '../utils/AllureReportUtils';
import { DummyPage } from '../pages/DummyPage';

test.describe('Suite Dummy Page (POM)', () => {
  test.beforeEach(async ({}, testInfo) => {
    await AllureReportUtils.epicContext('Playwright Demo', 'Formulario y contador', 'Validaciones de comportamiento de la dummy page');

    await AllureReportUtils.logStep(
      'Inicio de escenario',
      'INFO',
      'Se inicializa el caso de prueba con contexto enriquecido para Allure.',
      {
        testId: testInfo.testId,
        title: testInfo.title,
        retry: testInfo.retry,
        project: testInfo.project.name
      }
    );
  });

  test('@positivo carga la página principal con el título correcto', async ({ page }) => {
    const dummyPage = new DummyPage(page);

    await AllureReportUtils.logStep('Navegar a la página dummy', 'INFO', 'Se abre el fixture local de pruebas.');
    await dummyPage.goto();

    await expect(dummyPage.title).toHaveText('Página Dummy');
    await AllureReportUtils.logStep('Validar título principal', 'PASS', 'El título visible coincide con el texto esperado.');
  });

  test('@positivo muestra el contador inicial en 0', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await expect(dummyPage.counterValue).toHaveText('0');
    await AllureReportUtils.logStep('Validar estado inicial del contador', 'PASS', 'El contador inicia correctamente en 0.');
  });

  test('@positivo muestra saludo al enviar nombre', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    const name = 'Camila';
    await dummyPage.submitName(name);

    await expect(dummyPage.formMessage).toHaveText('Hola, Camila!');
    await expect(dummyPage.formMessage).toHaveClass(/success/);

    await AllureReportUtils.logStep('Validar saludo exitoso', 'PASS', 'Se muestra el mensaje de saludo esperado con estilo success.', {
      inputName: name,
      expectedMessage: 'Hola, Camila!'
    });
  });

  test('@positivo incrementa el contador', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    const times = 3;
    await dummyPage.incrementCounter(times);

    await expect(dummyPage.counterValue).toHaveText('3');
    await AllureReportUtils.logStep('Incrementar contador', 'PASS', 'El contador refleja el número de incrementos realizados.', {
      clicks: times,
      expectedCounter: 3
    });
  });

  test('@negativo muestra error si el nombre está vacío', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.submitEmptyForm();

    await expect(dummyPage.formMessage).toHaveText('El nombre es obligatorio.');
    await expect(dummyPage.formMessage).toHaveClass(/error/);

    await AllureReportUtils.logStep('Validar error por nombre vacío', 'PASS', 'Se muestra la validación de campo obligatorio.', {
      inputName: '(vacío)',
      expectedMessage: 'El nombre es obligatorio.'
    });
  });

  test('@negativo muestra error si el nombre contiene solo espacios', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.submitName('   ');

    await expect(dummyPage.formMessage).toHaveText('El nombre es obligatorio.');
    await expect(dummyPage.formMessage).toHaveClass(/error/);

    await AllureReportUtils.logStep(
      'Validar error por espacios en blanco',
      'PASS',
      'El formulario considera inválido un nombre con solo espacios.'
    );
  });

  test('@negativo no incrementa el contador al enviar el formulario', async ({ page }) => {
    const dummyPage = new DummyPage(page);
    await dummyPage.goto();

    await dummyPage.submitName('Camila');

    await expect(dummyPage.counterValue).toHaveText('0');
    await AllureReportUtils.logStep('Validar independencia entre formulario y contador', 'PASS', 'Enviar el formulario no afecta el valor del contador.');

    await AllureReportUtils.attachJson('Resumen de validación', {
      formSubmitted: true,
      counterExpected: 0,
      result: 'ok'
    });
  });
});
