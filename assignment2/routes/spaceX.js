import { Router } from "express";
import { getRedisClient } from "../config/redisConnect.js";
import { getRockets , getLaunches, getCapsules, getRocketsById, getLaunchesById, getCapsulesById, getRocketHistory} from "../controllers/spaceX.js";
const router = Router();

router.route('/rockets').get(getRockets);
router.route('/launches').get(getLaunches);
router.route('/capsules').get(getCapsules);
router.route('/rockets/history').get(getRocketHistory)
router.route('/rockets/:id').get(getRocketsById);
router.route('/launches/:id').get(getLaunchesById);
router.route('/capsules/:id').get(getCapsulesById);

export default router;
