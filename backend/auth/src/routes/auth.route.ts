import { Router } from "express";
import { currentUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { getCurrentUser, signUp } from "../controllers/auth.controller";

const router = Router();

router.get('/me',currentUser, requireAuth, getCurrentUser);
router.post('/signup', currentUser, requireAuth, signUp);

export { router as authRouter };