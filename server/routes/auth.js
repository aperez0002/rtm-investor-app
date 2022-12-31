import express from "express";
import { getRegister, postLogin, getCurrent, putLogout } from "../controllers/auth.js"
import { requiresAuth } from "../middleware/permissions.js";

const router = express.Router()

router.post("/register", getRegister);
router.post("/login", postLogin);
router.get("/current", requiresAuth, getCurrent);
router.put("/logout", requiresAuth, putLogout);

export default router;