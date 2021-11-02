import { registerPart } from '@frame';
import { counter } from './lib/counter/counter';

registerPart(counter, { count: 0 });
