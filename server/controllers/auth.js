import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateRegisterInput } from "../permissions/registerValidation.js";


export const getRegister = async (req, res) => {
    try{
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        });

        if (existingEmail) {
            return res
                .status(400)
                .json({ error: "There is already a user with this email."})
        }

        const hashPassword = await bcrypt.hash(req.body.password, 12);

        const newUser =  new User({
            email: req.body.email,
            password: hashPassword,
            name: req.body.name
        })

        const savedUser = await newUser.save();
        const userToReturn = { ...savedUser._doc };
        delete userToReturn.password;

        const payload = { user: savedUser._id};

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('access-token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60* 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json(userToReturn);



    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postLogin = async (req, res) => {
    try{
        const user = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        });

        if (!user) {
            return res
                .status(400)
                .json({ error: "Incorrect credentials."});
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res
                .status(400)
                .json({ error: "Incorrect credentials."})
        }

        const payload = { userId: user._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('access-token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production'
        });

        const userToReturn = { ...user._doc };
        delete userToReturn.password;

        return res.json({
            token: token,
            user: userToReturn
        })

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const getCurrent = async (req, res) => {
    try{
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }

        return res.json(req.user);

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const putLogout = async (req, res) => {
    try{
        res.clearCookie('access-token')
        return res.json({ loggedOut: true })

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

