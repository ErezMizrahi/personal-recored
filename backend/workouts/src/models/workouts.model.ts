import { Document, Model, Schema, model } from "mongoose";
import { Exercise, ExercisesDoc } from "./excersies.model";

interface WorkoutAttrs { 
    name: string;
    exercises: ExercisesDoc[];
}

export interface WorkoutDoc extends Document { 
    name: string;
    exercises: ExercisesDoc[];
}

interface WorkoutModel extends Model<WorkoutDoc> {
    build(attrs: WorkoutAttrs): Promise<WorkoutDoc>;
}

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
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

const Workout = model<WorkoutDoc, WorkoutModel>('Workout', workoutSchema);
export { Workout };