import mongoose, { Model, Document, Schema, model } from "mongoose";
import { RegisterUserDetails } from "../types/register-user-details.type";

interface InternalUserAttrs extends RegisterUserDetails {
    username: string;
    email: string;
    picture: string;
}

interface InternalUserDoc extends Document, RegisterUserDetails {
    username: string;
    email: string;
    picture: string;
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
    picture: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    height: {
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