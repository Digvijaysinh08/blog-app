import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 character!"],
    maxLength: [32, "Name must contain at least 32 character!"]
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, "Please enter a valid email address!"]
  },
  phone: {
    type: Number,
    required: true
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  education: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: true,
    enum: ["Reader", "Author"]
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 character!"],
    maxLength: [32, "Password must contain at least 32 character!"]
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};



export default mongoose.model("User", userSchema);
