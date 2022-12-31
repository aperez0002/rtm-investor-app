import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const requiresAuth = async (req, res, next) => {
    const token = req.cookies['access-token'];
    let isAuth = false;

    if(token) {
        try {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);

            try {
                const user = await User.findById(userId);

                if(user) {
                    const userToReturn = { ...user._doc };
                    delete userToReturn.password;
                    req.user = userToReturn;
                    isAuth = true;
                }
            } catch {
                isAuth = false;
            }
        } catch {
            isAuth = false;
        }
    }

    if(isAuth) {
        return next();
    } else {
        return res.status(401).send('Unauthorized');
    }

};
