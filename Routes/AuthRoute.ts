import {
  getUserByFirebaseToken,
  guestLogin,
  sendOtpData,
  verifyOtpData,
} from '../Controllers/AuthController.js';
import { Routes } from '../Helpers/Types';
import { createControllerRouter } from '../Helpers/Utility.js';
import {
  firebaseTokenSchema,
  guestAuthSchema,
  loginSchema,
  verifyOtpSchema,
} from '../Validations/AuthValidation.js';

export const baseURL = '/auth';

const routes: Routes = {
  'POST /user': {
    action: getUserByFirebaseToken,
    schema: firebaseTokenSchema,
    /**
     * @swagger
     * /user:
     *   post:
     *     tags:
     *       - Auth Routes
     *     summary: Get User by Firebase Token
     *     description: Get user details and jwt by using Firebase Token.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *              type: object
     *              required:
     *                - idToken
     *              properties:
     *                idToken:
     *                  type: string
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
  },
  'POST /otp/send': {
    action: sendOtpData,
    schema: loginSchema,
    /**
     * @swagger
     * /otp/send:
     *   post:
     *     tags:
     *       - Auth Routes
     *     summary: Send OTP
     *     description: Send OTP to the Phone Number.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *              type: object
     *              required:
     *                - phoneNumber
     *              properties:
     *                phoneNumber:
     *                  type: string
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               items:
     *                 $ref: '#/components/schemas/SendOTP'
     */
  },
  'POST /otp/verify': {
    action: verifyOtpData,
    schema: verifyOtpSchema,
    /**
     * @swagger
     * /otp/verify:
     *   post:
     *     tags:
     *       - Auth Routes
     *     summary: Verify OTP
     *     description: Verify OTP.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *              type: object
     *              required:
     *                - phoneNumber
     *                - otp
     *              properties:
     *                phoneNumber:
     *                  type: string
     *                otp:
     *                  type: string
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               items:
     *                 $ref: '#/components/schemas/VerifyOTP'
     */
  },
  'POST /login/guest': {
    action: guestLogin,
    schema: guestAuthSchema,
    /**
     * @swagger
     * /login/guest:
     *   post:
     *     tags:
     *       - Auth Routes
     *     summary: Guest Login
     *     description: get/create user with role guest.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *              type: object
     *              required:
     *                - name
     *                - phoneNumber
     *              properties:
     *                name:
     *                  type: string
     *                phoneNumber:
     *                  type: string
     *                email:
     *                  type: string
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
  },
};

export const authRouter = createControllerRouter(routes);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         token:
 *           type: string
 *     SendOTP:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *     VerifyOTP:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         token:
 *           type: string
 */
