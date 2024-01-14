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
        if(await this.getUserByEmail(payload.email ?? '')) {
            throw new BadRequestError('user already exists');
        }

        const user = InternalUser.build({
            username: payload.name ?? '',
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

}

const internalUserService = new InternalUserService();
export default internalUserService;