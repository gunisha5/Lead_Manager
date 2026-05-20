import morgan from 'morgan';
import { env } from '../config/env';

// Determine the format based on the environment
const format = env.NODE_ENV === 'production' ? 'combined' : 'dev';

// Custom morgan configuration
export const loggerMiddleware = morgan(format, {
  skip: (req, res) => env.NODE_ENV === 'test' // Skip logging in test environment
});
