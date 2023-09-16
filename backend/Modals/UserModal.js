
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    cart: {
        type: [String]
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isNumberVerified: {
        type: Boolean,
        default: false
    },
})

export default mongoose.model("Users", userSchema )