import { Router } from "express";
import { currentGoogleUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { createProgram } from "../controllers/workouts.controller";
import { requireAppUser } from "../middlewares/app.user";

const router = Router();

router.post('/create', currentGoogleUser, requireAuth, requireAppUser, validateRquest, createProgram);

export { router as workoutsRouter };