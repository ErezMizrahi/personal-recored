import { Router } from "express";
import { currentGoogleUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { createProgram, getCurrentUserPrograms, getCurrentUserWorkouts } from "../controllers/workouts.controller";
import { requireAppUser } from "../middlewares/app.user";
import { body } from "express-validator";

const router = Router();

router.get('/current', currentGoogleUser, requireAuth, requireAppUser, getCurrentUserPrograms);
router.get('/workouts', currentGoogleUser, requireAuth, requireAppUser, getCurrentUserWorkouts);

router.post('/create', currentGoogleUser, requireAuth, requireAppUser,[
    body('name')
        .notEmpty()
        .withMessage('name must be provided'),
    body('endDate')
        .notEmpty()
        .withMessage('endDate must be provided')
        .isISO8601()
        .withMessage('endDate must be a valid date')
        .custom((value) => {
            if(new Date(value) < new Date()) throw new Error('endDate must be in the future');
            return true;
        }),
    body('workouts')
        .isArray()
        .notEmpty()
        .withMessage('workouts must be an array and not empty'),
    body('workouts.*.name')
        .notEmpty()
        .withMessage('workout name must be provided'),
    body('workouts.*.daysOfTheWeek')
        .isArray()
        .notEmpty()
        .withMessage('workout daysOfTheWeek must be provided'),
    body('workouts.*.exercises')
        .isArray()
        .notEmpty()
        .withMessage('workout exercises must be provided'),
    body('workouts.*.exercises.*.name')
        .notEmpty()
        .withMessage('exercise name must be provided'),
    body('workouts.*.exercises.*.sets')
        .isNumeric()
        .notEmpty()
        .withMessage('exercise sets must be provided'),
    body('workouts.*.exercises.*.reps')
        .isNumeric()
        .notEmpty()
        .withMessage('exercise reps must be provided'),
    body('workouts.*.exercises.*.weight')
        .isNumeric()
        .notEmpty()
        .withMessage('exercise weight must be provided'),
    body('workouts.*.exercises.*.rest')
        .isNumeric()
        .notEmpty()
        .withMessage('exercise rest must be provided')
], validateRquest, createProgram);

export { router as workoutsRouter };