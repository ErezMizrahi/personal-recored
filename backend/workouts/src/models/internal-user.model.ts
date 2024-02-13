import mongoose, { Model, Document, Schema, model } from "mongoose";

interface InternalUserAttrs {
    username: string;
    email: string;
}

export interface InternalUserDoc extends Document {
    username: string;
    email: string;
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
    }
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

const InternalUser = model<InternalUserDoc, InternalUserModel>("InternalUser", internalUserSchema);

export { InternalUser };