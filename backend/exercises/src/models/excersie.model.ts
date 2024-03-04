import { Document, Model, Schema, model } from "mongoose";

interface ExerciseAttrs { 
    name: string;
    force: string;
    level: string;
    mechanic: string;
    equipment: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    instructions: string[];
    category: string;
}

export interface ExerciseDoc extends Document { 
    name: string;
    force: string;
    level: string;
    mechanic: string;
    equipment: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    instructions: string[];
    category: string;
}

interface ExerciseModel extends Model<ExerciseDoc> {
    build(attrs: ExerciseAttrs): Promise<ExerciseDoc>
}

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    force: {
        type: String,
        required: false
    },
    level: {
        type: String,
        required: false
    },
    mechanic: {
       type: String,
        required: false
    },
    equipment: {
       type: String,
        required: false
    },
    primaryMuscles: {
       type: [String],
        required: false
    },
    secondaryMuscles: {
       type: [String],
        required: false
    },
    instructions: {
       type: [String],
        required: false
    },
    category: {
       type: String,
        required: false
    }
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
});

exerciseSchema.statics.build = (attrs: ExerciseAttrs) => {
    return new Exercise(attrs);
}

const Exercise = model<ExerciseDoc, ExerciseModel>("Exercise", exerciseSchema);

export { Exercise };