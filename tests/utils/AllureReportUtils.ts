import { allure } from 'allure-playwright';

type LogStatus = 'INFO' | 'PASS' | 'WARN' | 'ERROR';

type LogMeta = Record<string, string | number | boolean>;

const statusIcon: Record<LogStatus, string> = {
  INFO: 'ℹ️',
  PASS: '✅',
  WARN: '⚠️',
  ERROR: '❌'
};

const buildMetaTable = (meta?: LogMeta): string => {
  if (!meta || Object.keys(meta).length === 0) {
    return '_Sin metadatos._';
  }

  const header = '| Campo | Valor |\n|---|---|';
  const rows = Object.entries(meta).map(([key, value]) => `| ${key} | ${String(value)} |`);
  return [header, ...rows].join('\n');
};

export class AllureReportUtils {
  static async epicContext(epic: string, feature: string, story: string): Promise<void> {
    await allure.epic(epic);
    await allure.feature(feature);
    await allure.story(story);
  }

  static async logStep(title: string, status: LogStatus, description: string, meta?: LogMeta): Promise<void> {
    await allure.step(`${statusIcon[status]} ${title}`, async () => {
      const message = [
        `### ${statusIcon[status]} ${title}`,
        '',
        `**Estado:** ${status}`,
        '',
        `**Detalle:** ${description}`,
        '',
        '#### Datos de ejecución',
        buildMetaTable(meta)
      ].join('\n');

      await allure.attachment(`Log - ${title}`, message, 'text/markdown');
    });
  }

  static async attachJson(name: string, payload: unknown): Promise<void> {
    const body = JSON.stringify(payload, null, 2);
    await allure.attachment(name, body, 'application/json');
  }
}
