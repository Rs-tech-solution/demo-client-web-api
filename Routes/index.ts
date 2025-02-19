import { Router } from 'express';
// import {  validateToken } from "../Middlewares/AuthMiddleware.js";
import { testRouter, baseURL as testBaseURL } from '../Routes/TestRoute.js';
import {
  campaignRouter,
  baseURL as campaignBaseURL,
} from '../Routes/CampaignRoute.js';
import { authRouter, baseURL as authBaseURL } from '../Routes/AuthRoute.js';

import { orderRouter, baseURL as orderBaseURL } from '../Routes/OrderRoute.js'
import { productRouter, baseURL as productBaseURL } from '../Routes/ProductRoute.js';

const router = Router();

router.use(testBaseURL, testRouter);
router.use(campaignBaseURL, campaignRouter);
router.use(authBaseURL, authRouter);
router.use(orderBaseURL, orderRouter);
router.use(productBaseURL, productRouter)

export default router;
