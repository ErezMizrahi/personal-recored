import { Model, Document, Schema, model } from "mongoose";
import { ProgramDoc } from "./program.model";

interface InternalUserAttrs {
    username: string;
    email: string;
    programs?: ProgramDoc[];
}

export interface InternalUserDoc extends Document {
    username: string;
    email: string;
    programs?: ProgramDoc[];
}

interface InternalUserModel extends Model<InternalUserDoc> {
    build(attrs: InternalUserAttrs): InternalUserDoc;
}

const internalUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    programs: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'program'
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
});

internalUserSchema.statics.build = (attrs: InternalUserAttrs) => {
    return new InternalUser(attrs);
}

const InternalUser = model<InternalUserDoc, InternalUserModel>("internalUser", internalUserSchema);

export { InternalUser };