import { Router } from "express";
import { currentGoogleUser, requireAuth, validateRquest } from "@erezmiz-pr/pr-common";
import { createProgram, getCurrentUserPrograms, getCurrentUserWorkouts, deleteProgramById, getTemplates } from "../controllers/workouts.controller";
import { requireAppUser } from "../middlewares/app.user";
import { body, param } from "express-validator";

const router = Router();
const validationMiddleware = [currentGoogleUser, requireAuth, requireAppUser];

router.get('/', [...validationMiddleware], getCurrentUserPrograms);

router.get('/templates', [...validationMiddleware], getTemplates);

router.get('/:programId/workouts', [...validationMiddleware], [
    param('programId')
    .notEmpty()
    .withMessage('programId must be provided')
    .isMongoId()
    .withMessage('programId must be a valid mongo id')
], validateRquest, getCurrentUserWorkouts);

router.post('/create', [...validationMiddleware],[
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
        .isArray({min: 1})
        .withMessage('workouts must be an array and not empty'),
    body('workouts.*.name')
        .notEmpty()
        .withMessage('workout name must be provided'),
    body('workouts.*.daysOfTheWeek')
        .isArray({min: 1})
        .withMessage('workout daysOfTheWeek must be provided'),
    body('workouts.*.exercises')
        .isArray({min: 1})
        .withMessage('workout exercises must be provided'),
    body('workouts.*.exercises.*.name')
        .notEmpty()
        .withMessage('exercise name must be provided'),
    body('workouts.*.exercises.*.sets')
        .isFloat({ min: 1 })
        .withMessage('exercise sets must be provided'),
    body('workouts.*.exercises.*.reps')
        .isFloat({ min: 1 })
        .withMessage('exercise reps must be provided'),
    body('workouts.*.exercises.*.weight')
        .isFloat({ min: 1 })
        .withMessage('exercise weight must be provided'),
    body('workouts.*.exercises.*.rest')
        .isFloat({ min: 30 })
        .withMessage('exercise rest must be provided')
], validateRquest, createProgram);

router.delete('/:programId/delete', [...validationMiddleware], [
    param('programId')
    .notEmpty()
    .withMessage('programId must be provided')
    .isMongoId()
    .withMessage('programId must be a valid mongo id')
], validateRquest, deleteProgramById)

export { router as workoutsRouter };