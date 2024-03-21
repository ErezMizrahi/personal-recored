import { TokenPayload } from "google-auth-library";
import { InternalUser, InternalUserDoc } from "../models/internal-user.model";
import { BadRequestError } from "@erezmiz-pr/pr-common";
import { RegisterUserDetails } from "../types/register-user-details.type";
import { UserCreatedPublisher } from "../events/publishers/user.created";
import { rabbitMqWrapper } from "../mq.wrapper";
import mongoose from "mongoose";

class InternalUserService {

    private async findUser (email: string): Promise<InternalUserDoc | null> {
        return await InternalUser.findOne({ email });
    }

    async getCurrentUser(payload: TokenPayload) {
        const user = payload.email ? await this.findUser(payload.email) : null;
        if(!user) {
            throw new BadRequestError('user dosent exists');
        }
        return user;
    }

    async signup(userDeatils: RegisterUserDetails, payload: TokenPayload): Promise<InternalUserDoc> {
        if(payload.email && await this.findUser(payload.email)) {
            throw new BadRequestError('User already exists with this email address');
        }

        const user = InternalUser.build({
            username: payload.name ?? this.extractUsername(payload.email),
            email: payload.email ?? '',
            picture: payload.picture ?? '',
            ...userDeatils
        });

        await user.save();

        new UserCreatedPublisher(rabbitMqWrapper.channel).publish({
            username: user.username,
            email: user.email
        });

        return user;
    }

    async removeUser() {
        await InternalUser.deleteMany();
    }

    private extractUsername(email?: string): string {
        if(email) {
            const username = email.split('@')[0];
            return username;
        }
        return 'undefined';
    }
}

const internalUserService = new InternalUserService();
export default internalUserService;