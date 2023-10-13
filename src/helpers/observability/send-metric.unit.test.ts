import { sendDistributionMetric } from 'datadog-lambda-js';
import { sendMetric } from './send-metric';

jest.mock('datadog-lambda-js');

const envVars = process.env;
describe('sendMetric', () => {
  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = envVars;
  });

  it('calls sendDistributionMetric with default tags, from environment variables', () => {
    process.env.DD_ENV = 'test-env';
    process.env.DD_SERVICE = 'foo';
    process.env.DD_SQUAD = 'any-squad';
    process.env.DD_TRIBE = 'any-tribe';

    sendMetric('thisKey', 12);

    expect(sendDistributionMetric).toHaveBeenCalledWith(
      'thisKey',
      12,
      'env:test-env',
      'service:foo',
      'squad:any-squad',
      'tribe:any-tribe'
    );
  });

  it('calls sendDistributionMetric with additional tags', () => {
    process.env.DD_ENV = 'test-env';
    process.env.DD_SERVICE = 'foo';
    process.env.DD_SQUAD = 'any-squad';
    process.env.DD_TRIBE = 'any-tribe';

    sendMetric('thisKey', 12, 'another:tag', 'second:tag');

    expect(sendDistributionMetric).toHaveBeenCalledWith(
      'thisKey',
      12,
      'env:test-env',
      'service:foo',
      'squad:any-squad',
      'tribe:any-tribe',
      'another:tag',
      'second:tag'
    );
  });
});
