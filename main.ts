import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import apiRoutes from './Routes/index.js';
import logger from './Services/LoggerService.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(
  morgan('tiny', {
    stream: {
      write: (text: string) => {
        logger.info(text);
      },
    },
  })
);

// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Web API',
      version: '1.0.0',
      description: 'Documentation for Web API',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: 'Development Server',
      },
    ],
  },

  apis: ['./Routes/*.ts', './Controllers/*.ts', './Routes/TestRoute.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', apiRoutes);

app.get('/', (request, response, next) => {
  response.send('Welcome to Web API');
});

app.listen(port, () => {
  logger.info(`App listening at port ${port}`);
});
