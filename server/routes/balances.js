import express from "express";
import { getBalances } from "../controllers/balances.js";
import { getTDAuth } from "../controllers/tdApi.js";

const router = express.Router()

router.get("/balances", getBalances);
router.get("/tdAuth", getTDAuth)


export default router;


