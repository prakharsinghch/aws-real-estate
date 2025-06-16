import express from 'express';
import {createApplications, updateApplicationStatus, listApplications} from "../controllers/applicationControllers"
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post("/" , authMiddleware(["tenant"]), createApplications)
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus);
router.get("/",authMiddleware(["tenant", "manager"]), listApplications)

export default router;