import { Document, Model, Schema, model } from "mongoose";

interface WorkoutAttrs { 
    name: string;
    dayOfTheWeek: string[];
    exercises: ExercisesAttrs[];
}

export interface ExercisesAttrs { 
    name: string;
    sets: number;
    reps: number;
    weight: number;
    rest: number;
}

export interface WorkoutDoc extends Document { 
    name: string;
    dayOfTheWeek: string[];
    exercises: ExercisesAttrs[];
}

interface WorkoutModel extends Model<WorkoutDoc> {
    build(attrs: WorkoutAttrs): Promise<WorkoutDoc>;
}

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dayOfTheWeek: {
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
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
});

workoutSchema.statics.build = (attrs: WorkoutAttrs) => {
    return new Workout(attrs);
}

const Workout = model<WorkoutDoc, WorkoutModel>('workout', workoutSchema);
export { Workout };