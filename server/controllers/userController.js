import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import User from '../models/userSchema.js';
import { sendToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Avatar is required", 400));
    }

    const avatar = req.files.avatar;
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(
            new ErrorHandler(
                "Invalid file type. Please provide your avatar in png, jpg, jpeg, or webp format.",
                400
            )
        );
    }

    const { name, email, password, phone, role, education } = req.body;

    if (!name || !email || !password || !phone || !role || !education) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary error:",
            cloudinaryResponse.error || "Unknown Cloudinary error!"
        );
        return next(new ErrorHandler("Avatar upload failed", 500));
    }

    user = await User.create({
        name,
        email,
        password,
        phone,
        role,
        education,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    sendToken(user, 200, "User registered successfully", res);
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;

    if(!email || !password || !role) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    if(user.role != role){
        return next(new ErrorHandler(`User with provide role(${role}) not found`, 403));
    }
    sendToken(user, 200, "User logeed in successfully", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()), 
        httpOnly: true})
        .json({
        success: true,
        message: "User logged out successfully",
    });
});

export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const getAllAuthors = catchAsyncErrors(async (req, res, next) => {
    const authors = await User.find({role: "Author"});
    res.status(200).json({
        success: true,
        authors,
    });
});
