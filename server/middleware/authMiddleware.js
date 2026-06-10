import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        console.log("AUTH HEADER:", req.headers.authorization);

        const token = req.headers.authorization.split(" ")[1];
        console.log("TOKEN:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED:", decoded);

        const user = await User.findOne({ _id: decoded.id });
        console.log("USER:", user);

        req.user = user;
        next();

    } catch (error) {
        console.log("AUTH ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default authMiddleware;