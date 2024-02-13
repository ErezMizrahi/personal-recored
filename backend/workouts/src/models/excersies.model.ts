import { Document, Model, Schema, model } from "mongoose";

interface ExercisesAttrs { 
    name: string;
    sets: number;
    reps: number;
    weight: number;
    rest: number;
}

export interface ExercisesDoc extends Document { 
    name: string;
    sets: number;
    reps: number;
    weight: number;
    rest: number;
}

interface ExercisesModel extends Model<ExercisesDoc> {
    build(attrs: ExercisesAttrs): Promise<ExercisesDoc>
}

const exerciseSchema = new Schema({
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
    },
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
});

exerciseSchema.statics.build = (attrs: ExercisesAttrs) => {
    return new Exercise(attrs);
}

const Exercise = model<ExercisesDoc, ExercisesModel>("Exercise", exerciseSchema);

export { Exercise };