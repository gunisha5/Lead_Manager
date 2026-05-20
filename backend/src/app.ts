import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import authRoutes from './features/auth/auth.routes';
import leadRoutes from './features/leads/lead.routes';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', limiter);

// Logging
app.use(loggerMiddleware);

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(errorHandler);

export default app;
