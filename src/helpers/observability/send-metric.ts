import { sendDistributionMetric } from 'datadog-lambda-js';
export const sendMetric = (key: string, value: number, ...tags: string[]) => {
  const defaultTags = [
    `env:${process.env.DD_ENV}`,
    `service:${process.env.DD_SERVICE}`,
    `squad:${process.env.DD_SQUAD}`,
    `tribe:${process.env.DD_TRIBE}`,
  ];
  sendDistributionMetric(key, value, ...defaultTags, ...tags);
};
