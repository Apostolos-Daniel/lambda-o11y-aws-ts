import { tracer } from 'dd-trace';
tracer.init();

import { setTag } from './set-tag';
import { sendMetric } from './send-metric';

export { setTag, sendMetric };
