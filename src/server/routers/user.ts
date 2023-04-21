import { UserSchema } from '../models/user.model';
import { publicProcedure, router } from '../trpc';
import { addUser } from '../db/user.db';


export const UserRoutes = router({
    addUser: publicProcedure.input(UserSchema).mutation(async (req) => {     
        const result = await addUser(req.input);
        if (result.success) {
            return req.input;
        } else {
            return { error: result.error };
        }
    }),
    getUser: publicProcedure.query((req) => {
        return 'get user'
    }),
})
