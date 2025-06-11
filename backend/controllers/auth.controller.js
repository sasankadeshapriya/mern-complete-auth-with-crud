import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import {verificationTokenGenerator} from "../utils/verificationTokenGenerator.js";
import {tokenGernerateAndCookieSet} from "../utils/tokenGernerateAndCookieSet.js";
import {sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail} from "../mailtrap/emails.js";
import exp from "constants";

export const signup = async (req, res) => {
    const {email, password, name} = req.body;
    try{
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist) {
            return res.status(400).json({success:false, message: "User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = verificationTokenGenerator();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000 
        });

        await user.save();

        tokenGernerateAndCookieSet(res, user._id);

        await sendVerificationEmail(user.email, user.verificationToken);

        res.status(201).json({
            success: true,
            message: "User registered successfully", 
            user: {
                ...user._doc,
                password: undefined,
            }
        });

    }catch(error){
        res.status(400).json({success:false, message: error.message});
    }
}

export const verifyEmail = async (req,res) =>{
    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationExpiresAt: {$gt: Date.now()}
        });

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    }catch(error){
        res.status(500).json({success: false, message: `Error verifying email: ${error.message}`});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: "Invalid email or password"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid email or password"});
        }

        tokenGernerateAndCookieSet(res, user._id);

        user.lastLogin = Date.now();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    }catch(error) {
        console.error("Login error:", error);
        res.status(400).json({success: false, message: `Error logging in: ${error.message}`});
    }
}

export const logout = async (req, res) => {

    if(!req.cookies.token) {
        return res.status(400).json({
            success: false,
            message: "You are not logged in",
        });
    }

    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

export const forgetPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            console.error("User not found for forget password:", email);
            return res.status(400).json({success: false, message: "User not found"});
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 2 * 60 * 60 * 1000; 
        user.restPasswordToken = resetToken;
        user.restPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        await sendPasswordResetEmail(
            user.email, 
            `${process.env.NODE_ENV === 'production' 
              ? process.env.CLIENT_URL 
              : 'http://localhost:5000'}/reset-password/${resetToken}`
        );
        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully",
        });
    } catch (error) {
        console.error("Forget password error:", error);
        res.status(400).json({
            success: false,
            message: `Error sending password reset email: ${error.message}`
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            restPasswordToken: token,
            restPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.restPasswordToken = undefined;
        user.restPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ 
            success: true, 
            message: "Password reset successfully", 
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error resetting password: ${error.message}`
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Check auth error:", error);
        res.status(400).json({
            success: false,
            message: `error: ${error.message}`
        });
    }
};