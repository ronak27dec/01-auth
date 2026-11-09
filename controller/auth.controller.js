import { userModel } from "../src/models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config } from "./../src/config/config.js";
import { decode } from "punycode";

export async function registerUser(req, res) {
    const { username, email, password } = req.body;
    const isRegistered = await userModel.findOne({
        $or: [{ email }],
    });
    if (isRegistered) {
        return res.status(400).json({ message: "User already exist" });
    }
    const hashedPass = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
    const newUser = await userModel.create({
        username: username,
        email: email,
        password: hashedPass,
    });
    const token = jwt.sign(
        {
            id: newUser._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "15m",
        },
    );
    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        },
        token: token,
    });
}

export async function getMe(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    return res.status(200).json({
        message: "Successfully fetched user",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
}
