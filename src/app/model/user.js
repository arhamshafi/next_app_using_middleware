import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Must Be Required"],
        maxLength: [30, "Name Cannot Exceed 30 Characters"]
    },
    email: {
        type: String,
        required: [true, "Email Must Be REquired"],
        unique: true,
    },
    password: {
        type: String,
        select : false,
        required: [true, "Password Must Be Required"],
        minLength: [6, "Minimum Password Length Must Be 6 Characters"],
        match: [/(?=.*[A-Z])/, "Password must contain at least one uppercase letter"]
    }
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)


})

export default mongoose.models.User || mongoose.model("User", UserSchema)