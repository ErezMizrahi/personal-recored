import { Router } from "express";
import { currentUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { cleanDb, load, search } from "../controllers/excersies.controller";
import { param, query } from "express-validator";

const router = Router();

router.get('/load', load);
router.get('/clean', cleanDb);

router.get('/search', [
    query('name')
        .notEmpty()
        .withMessage("must search by name"),
    query('from')
        .notEmpty()
        .withMessage("must have a from")
], validateRquest, search);

export { router as excersiesRouter };