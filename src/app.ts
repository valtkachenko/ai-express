import express from 'express';
import logger from 'morgan';
import 'dotenv/config';
import { APP_CONFIG, DEFAULT_PORT } from './constants/app.constants';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './api-docs/swagger.json';
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';

// Modules
import { salesModule } from './modules/sales/sales.module';
import { indexModule } from './modules/index/index.module';

// Create Express server
export const app = express();

// Express configuration
app.set(APP_CONFIG.PORT, process.env.PORT || DEFAULT_PORT);

app.use(logger('dev'));

app.use(express.json());

app.use('/', ...indexModule.routes, ...salesModule.routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorNotFoundHandler);
app.use(errorHandler);
