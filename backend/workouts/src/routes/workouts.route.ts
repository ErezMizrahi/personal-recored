import { Router } from "express";
import { currentUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { createProgram } from "../controllers/workouts.controller";
import { requireAppUser } from "../middlewares/app.user";

const router = Router();

router.post('/create', currentUser, requireAuth, requireAppUser, validateRquest, createProgram);

export { router as workoutsRouter };