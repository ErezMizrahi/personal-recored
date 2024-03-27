import { Document, Model, Schema, model } from "mongoose";
import { InternalUserDoc } from "./internal-user.model";

interface ProgramAttrs { 
    name: string;
    endDate: string;
    owner: InternalUserDoc;
    workouts: WorkoutAttrs[];
}

export interface WorkoutAttrs { 
    name: string;
    daysOfTheWeek: string[];
    exercises: ExercisesAttrs[];
}

export interface ExercisesAttrs { 
    name: string;
    sets: number;
    reps: number;
    weight: number;
    rest: number;
}

export interface ProgramDoc extends Document { 
    name: string;
    endDate: string;
    owner: InternalUserDoc;
    workouts: WorkoutAttrs[];
}

interface ProgramModel extends Model<ProgramDoc> {
    build(attrs: ProgramAttrs): Promise<ProgramDoc>;
}

const programSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'internalUser'
    },
    workouts: [{
        name: {
            type: String,
            required: true
        },
        daysOfTheWeek: {
            type: [String],
            required: true
        },
        exercises: [{
            name: {
                type: String,
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            rest: {
                type: Number,
                required: true
            }
        }]
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.program_id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.owner;
            ret.workouts.forEach((workout: any) => {
                delete workout._id;
                workout.exercises.forEach((exercise: any) => {
                    delete exercise._id;
                });
            });
        },
    }
});

programSchema.statics.build = (attrs: ProgramAttrs) => {
    return new Program(attrs);
}

const Program = model<ProgramDoc, ProgramModel>('program', programSchema);
export { Program };