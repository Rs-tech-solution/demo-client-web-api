import { getTestData, insertData } from '../Controllers/TestController.js';
import { Routes } from '../Helpers/Types.js';
import { createControllerRouter } from '../Helpers/Utility.js';
import {
  validateToken,
  allRoles,
  validateRole,
} from '../Middlewares/AuthMiddleware.js';
import { insertDataValidationSchema } from '../Validations/TestValidation.js';

export const baseURL = '/test';

const routes: Routes = {
  'GET /:id': {
    action: getTestData, // required
    // middlewares: [ validateRole([allRoles.Admin, allRoles.Other]) ] // optional
    /**
     * @swagger
     * /test/{id}:
     *   get:
     *     tags:
     *       - Test Routes
     *     summary: Get Test data
     *     description: Retrieve Test data by id.
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: Test
     *     responses:
     *       200:
     *         description: Successful operation
     */
  },
  'POST /': {
    action: insertData,
    schema: insertDataValidationSchema,
    // middlewares: [ validateToken, validateRole([allRoles.Admin]) ] // optional
    /**
     * @swagger
     * /test:
     *   post:
     *     tags:
     *       - Test Routes
     *     summary: Insert Test data
     *     description: Insert new test data into the db.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *              type: object
     *              required:
     *                - data1
     *                - data2
     *              properties:
     *                data1:
     *                  type: string
     *                data2:
     *                  type: string
     *     responses:
     *       200:
     *         description: Successful operation
     */
  },
};

export const testRouter = createControllerRouter(routes);
