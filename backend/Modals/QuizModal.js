
import mongoose, {Schema} from "mongoose";

const quizSchema = new Schema ({
    question: {
        type: String,
        require: true,
    },
    options: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },

    isVerified: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model("Quiz", quizSchema)