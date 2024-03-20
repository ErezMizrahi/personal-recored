import { Router } from "express";
import { currentGoogleUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { getCurrentUser, signUp, deleteUsers } from "../controllers/auth.controller";
import { body } from "express-validator";

const router = Router();

router.get('/me',currentGoogleUser, requireAuth, validateRquest, getCurrentUser);

router.post('/signup', currentGoogleUser, requireAuth,
[
    body('firstName')
        .trim()
        .notEmpty()
        .isString()
        .isLength({min: 2})
        .withMessage("first name is invalid"),
    body('lastName')
        .trim()
        .notEmpty()
        .isString()
        .isLength({min: 2})
        .withMessage("last name is invalid"),
    body('gender')
        .trim()
        .toLowerCase()
        .isIn(['male', 'female'])
        .withMessage("gender is invalid"),
    body('age')
        .trim()
        .isFloat({min: 18})
        .withMessage("Must be older the 18"),
    body('weight')
        .trim()
        .notEmpty()
        .withMessage("weight is invalid"),
    body('height')
        .trim()
        .notEmpty()
        .withMessage("height is invalid")
],
 validateRquest, signUp);

router.delete('/deleteAll', deleteUsers)

export { router as authRouter };