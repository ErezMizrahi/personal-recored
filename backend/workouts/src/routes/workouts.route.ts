import { Router } from "express";
import { currentUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { test } from "../controllers/workouts.controller";
import { requireAppUser } from "../middlewares/app.user";

const router = Router();

router.get('/test', currentUser, requireAuth, requireAppUser, validateRquest, test);
// router.get('/me',currentUser, requireAuth, getCurrentUser, validateRquest);

export { router as workoutsRouter };