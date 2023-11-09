import { TokenPayload } from "google-auth-library";
import { InternalUser } from "../models/internal-user.model";
import { BadRequestError } from "@erezmiz-pr/pr-common";

class InternalUserService {

    private async getUserByEmail(email: string) {
       return await InternalUser.findOne({ email });
    }

    async register(payload: TokenPayload) {
        if(await this.getUserByEmail(payload.email ?? '')) {
            throw new BadRequestError('user already exists');
        }

        const user = InternalUser.build({
            username: payload.name ?? '',
            email: payload.email ?? '',
            picture: payload.picture ?? ''
        });

        await user.save();
        console.log(user)
        return user;
    }

}

const internalUserService = new InternalUserService();
export default internalUserService;