import express from 'express';
import { getProperty, getProperties , createProperty } from '../controllers/propertyControllers';
import multer from 'multer';
import { authMiddleware } from '../middleware/authMiddleware';

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = express.Router();

router.get("/", getProperties);
router.post("/:id", getProperty);
router.post("/", authMiddleware(["manager"]),upload.array("photos"),createProperty);

export default router;