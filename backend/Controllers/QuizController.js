import jwt from "jsonwebtoken";
import QuizModal from "../Modals/QuizModal.js";


export const AddQuiz = async (req, res) => {
    try{
        const {question, options, answer} = req.body.userData;
        const {token} = req.body;

        if(!question || !options || !answer) return res.json({success: false, message: "All fields are mandaory"})


        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false , message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const quiz = new QuizModal({ question,options,answer, userId: userId });

        // const product = new ProductModal({ name, price, image, category });
        await quiz.save();

        return res.status(201).json({ success: true, message: "Quiz added Successfully" })


    } catch(error){
        return res.json({ success: false, message: error})
    }
}