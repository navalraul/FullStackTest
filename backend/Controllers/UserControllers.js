import UserModal from "../Modals/UserModal.js";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
// import { v4 as uuidv4 } from 'uuid';

export const Register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body.userData;

        if(!name || !email || !password || !role) return res.json({ success: false, message: "All fields are mandatory"})

        const isEmailExist = await UserModal.find({email})
        if(isEmailExist.length) {
            return res.json({ success:false, message: "Email already exist"})
        }

        const hashedPassword = await bcyrpt.hash(password, 10)

        const user = new UserModal({name, email, password: hashedPassword, role})

        await user.save();

        return res.json({ success: true, message: "Register successfull..."})

    }catch(error){
        return res.json({ success: false, message: error})
    }
}


export const Login = async (req, res) => {
    try{
        const { email, password} = req.body.userData;

        if(!email || !password) return res.json({ success: false, message: "All fields are mandatory.."})

        const user = await UserModal.findOne({email})
        if(!user) return res.json({success: false, message: "User not found!"})

        if(user.isBlocked) {
            return res.json({success: false, message: "You have been blocked.."})
        }

        const isPasswordRight = await bcyrpt.compare(password, user.password)
        // const isPasswordRight = await bcyrpt.compare(password, user.password)
        
        if(isPasswordRight) {
            const userObject = {
                name: user?.name,
                email: user?.email,
                role: user?.role,
                _id: user?._id
            }
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET)
            return res.json({ success: true, message: "Login success", user: userObject, token: token})
        }

        return res.json({ success: false, message: "Password is wrong...."})
    }catch(error){
        return res.json({ success: false, message: error})
    }
}

export const getCurrentUser = async ( req, res) => {
    try{
        const { token } = req.body;
        if(!token) return res.status(404).json({ success: false, message: "Token is required!" })

        const decodedData= jwt.verify(token, process.env.JWT_SECRET )

        if(!decodedData) {
            return res.status(404).json({ success: false , message: "Not valid json token.." })
        }

        const userId = decodedData?.userId

        const user = await UserModal.findById(userId);

        if(!user) {
            return res.status(404).json({ success: false, message: "User not found.." })
        }

        const userObeject = {
            name: user?.name,
            email: user?.email,
            role: user?.role,
            _id: user?._id
        }

        return res.status(200).json({ success: true, user: userObeject })


    } catch (error) {
        return res.json({ success: false , message: error })
    }

}