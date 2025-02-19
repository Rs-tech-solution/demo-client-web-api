import {
  getList,
  getDetails,
  getDonors,
  getTotals,
  getCategoryFilterCampaign,
  getCampaignTotalDonation
} from '../Controllers/CampaignController.js';
import { Routes } from '../Helpers/Types.js';
import { createControllerRouter } from '../Helpers/Utility.js';

export const baseURL = '/campaign';

const routes: Routes = {
  'GET /:status': {
    action: getList,
    /**
     * @swagger
     * /campaign/{status}:
     *   get:
     *     tags:
     *       - Campaign Routes
     *     summary: Get Campaign data
     *     description: Retrieve Campaign List by status (active/closed/all).
     *     parameters:
     *       - in: path
     *         name: status
     *         schema:
     *           type: string
     *         required: true
     *         description: Campaign status
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CampaignTypeForList'
     */
  },
  'GET /:code/detail': {
    action: getDetails,
    /**
     * @swagger
     * /campaign/{code}/detail:
     *   get:
     *     tags:
     *       - Campaign Routes
     *     summary: Get Campaign data
     *     description: Retrieve Campaign data by campaign code.
     *     parameters:
     *       - in: path
     *         name: code
     *         schema:
     *           type: string
     *         required: true
     *         description: Campaign code
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CampaignDetailsType'
     */
  },
  'GET /:id/totals': {
    action: getTotals,
    /**
     * @swagger
     * /campaign/{id}/totals:
     *   get:
     *     tags:
     *       - Campaign Routes
     *     summary: Get Campaign data
     *     description: Retrieve Campaign totals (requiredAmount, ProcuredAmount, DonorCount) by campaign id.
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: Campaign ID
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CampaignTotalsType'
     */
  },

  'GET /:code/campaign_total_dontion':{
    action: getCampaignTotalDonation,
  },

  'GET /:id/donors': {
    action: getDonors,
    /**
     * @swagger
     * /campaign/{id}/donors:
     *   get:
     *     tags:
     *       - Campaign Routes
     *     summary: Get Campaign's donor list
     *     description: Retrieve Campaign's donor list by campaign id.
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: Campaign ID
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CampaignDonorType'
     */
  },
  'GET /filter/category': {
    action: getCategoryFilterCampaign,
  }
};

export const campaignRouter = createControllerRouter(routes);

/**
 * @swagger
 * components:
 *   schemas:
 *     CampaignTypeForList:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         status:
 *           type: number
 *         code:
 *           type: string
 *         title:
 *           type: string
 *         imageSrc:
 *           type: string
 *         endDate:
 *           type: string
 *           format: date
 *         requiredAmount:
 *           type: number
 *         procuredAmount:
 *           type: number
 *         donorsCount:
 *           type: number
 *     CampaignDetailsType:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         status:
 *           type: number
 *         title:
 *           type: string
 *         imageSrc:
 *           type: string
 *         shortDesc:
 *           type: string
 *         description:
 *           type: string
 *         ngoId:
 *           type: number
 *         endDate:
 *           type: string
 *           format: date
 *         requiredAmount:
 *           type: number
 *     CampaignTotalsType:
 *       type: object
 *       properties:
 *         campaignId:
 *           type: number
 *         procuredAmount:
 *           type: number
 *         donorsCount:
 *           type: number
 *     CampaignDonorType:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         currency:
 *           type: string
 *         exchange:
 *           type: number
 *         amount:
 *           type: number
 *         createdOn:
 *           type: string
 *           format: date-time
 */
