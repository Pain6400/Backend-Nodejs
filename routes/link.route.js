import { Router } from "express";
import { createLink, getLinks } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.get('/', requireToken, getLinks);
router.post('/', requireToken, createLink)

export default router; 