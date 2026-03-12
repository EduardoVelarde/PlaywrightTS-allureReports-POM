# Proyecto Playwright + Allure + POM

Este proyecto de ejemplo usa **Playwright**, **Allure Report** y el patrón **Page Object Model (POM)** para automatizar una página dummy local.

## Requisitos
- Node.js 18+

## Instalación
```bash
npm install
npx playwright install
```

## Ejecutar pruebas
```bash
npm test
```

## Ejecutar por tags (grep)
```bash
npm test -- --grep @positivo
npm test -- --grep @negativo
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
