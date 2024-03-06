import { Router } from "express";
import { currentUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { cleanDb, load, searchByName } from "../controllers/excersies.controller";
import { param, query } from "express-validator";

const router = Router();

router.get('/load', load);
router.get('/clean', cleanDb);

router.get('/search/:by', [
    param('by')
        .trim()
        .toLowerCase()
        .isIn(['name', 'level', 'category'])
        .withMessage("search by is invalid"),
    query('query')
        .notEmpty()
        .withMessage("must have a query")
], validateRquest, searchByName);

export { router as excersiesRouter };