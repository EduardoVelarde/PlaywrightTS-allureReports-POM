# Proyecto Playwright + Allure + POM

Este proyecto de ejemplo usa **Playwright**, **Allure Report** y el patrón **Page Object Model (POM)** para automatizar una página dummy local.

## Requisitos
- Node.js 20.19+

## Instalación
```bash
npm install
npx playwright install
```

## Ejecutar pruebas
```bash
npm run test:pom
```

## Ejecutar por tags (grep)
```bash
npm run test:pom -- --grep @positivo
npm run test:pom -- --grep @negativo
```

## Generar reporte Allure
```bash
npm run allure:generate
npm run allure:open
```

## Utilidades para mejorar logs en Allure
Este proyecto incluye la utilidad `tests/utils/AllureReportUtils.ts` para enriquecer el reporte con:
- **Steps con íconos y estado** (`INFO`, `PASS`, `WARN`, `ERROR`).
- **Adjuntos en Markdown** con detalle y tabla de metadatos.
- **Adjuntos JSON** para evidencias estructuradas.
- **Contexto Allure** (`epic`, `feature`, `story`) por escenario.

## Estructura
- `tests/fixtures/dummy.html`: página dummy local.
- `tests/pages`: Page Objects.
- `tests/specs`: suites de pruebas (positivas y negativas).

## ReleaseReady QA runner

La configuración predeterminada `playwright.config.mjs` ejecuta únicamente
`tests/runner.spec.mjs`. Los siete tests POM/Allure originales se conservan
sin cambios y usan `playwright.pom.config.ts` mediante `npm run test:pom`.

```bash
npm ci
npx playwright install chromium
npm run test:qa:smoke
npm run test:qa:failure
```

`@smoke` debe pasar. `@failure` falla deliberadamente con una aserción, sale
con código 1 y produce evidencia para que la integración ReleaseReady verifique
FAILED. `npm test` sin filtro ejecuta ambos y por tanto termina con código 1.

Ambos escriben el marcador `ReleaseReady QA runner fixture` en stdout. La
configuración genera JSON, HTML y trace de fallo sin autenticación: usa HTML
estático con `page.setContent`, no navega a QA ni requiere secretos.
Playwright queda fijado a 1.58.0, la versión ya resuelta por el lockfile y usada
por la fixture de ReleaseReady. El runner dedicado debe disponer de su Chromium.

La integración del servicio exige estos archivos en la rama `main`, con
package/config en la raíz. Publicar el parche no verifica por sí mismo que
el runner QA esté operativo ni que acepte y publique artifacts.
