import express from "express";
const router = express.Router();

import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.get('/users', protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id",protectRoute, sendMessage);

export default router;