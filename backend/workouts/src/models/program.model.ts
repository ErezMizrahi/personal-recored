import { Document, Model, Schema, model } from "mongoose";
import { WorkoutDoc } from "./workouts.model";
import { InternalUserDoc } from "./internal-user.model";

interface ProgramAttrs { 
    name: string;
    endDate: string;
    owner: InternalUserDoc;
    workouts: WorkoutDoc[];
}

interface ProgramDoc extends Document { 
    name: string;
    endDate: string;
    owner: InternalUserDoc;
    workouts: WorkoutDoc[];
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
        type: Schema.Types.ObjectId,
        ref: 'workout'
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
});

programSchema.statics.build = (attrs: ProgramAttrs) => {
    return new Program(attrs);
}

const Program = model<ProgramDoc, ProgramModel>('program', programSchema);
export { Program };