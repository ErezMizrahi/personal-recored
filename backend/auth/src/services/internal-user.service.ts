import { TokenPayload } from "google-auth-library";
import { InternalUser } from "../models/internal-user.model";
import { BadRequestError } from "@erezmiz-pr/pr-common";
import { RegisterUserDetails } from "../types/register-user-details.type";
import { UserCreatedPublisher } from "../events/publishers/user.created";
import { rabbitMqWrapper } from "../../amqp/mq.wrapper";

class InternalUserService {

    private async getUserByEmail(email: string) {
       return await InternalUser.findOne({ email });
    }

    async getCurrentUser(payload: TokenPayload) {
        const user = await this.getUserByEmail(payload.email ?? '');
        if(!user) {
            throw new BadRequestError('user dosent exists');
        }

        return user;
    }

    async register(userDeatils: RegisterUserDetails, payload: TokenPayload) {
        console.log('payload', payload)
        if(await this.getUserByEmail(payload.email ?? '')) {
            throw new BadRequestError('user already exists');
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