import { Router } from "express";
import { createLink, getLinkById, getLinks, removeLinkById } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

router.get('/', requireToken, getLinks);
router.get("/:linkId", requireToken, paramLinkValidator, getLinkById)
router.post('/', requireToken, bodyLinkValidator, createLink)
router.delete('/:linkId', requireToken, paramLinkValidator, removeLinkById)
export default router; 