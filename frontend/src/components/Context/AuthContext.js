import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import api from "../ApiConfig";


export const AuthContexts = createContext();

const initialstate = {currentUser: null};

const reducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return{...state, currentUser: action.payload}
        case "LOGOUT":
            return{...state, currentUser:null}
        default:
            return state
    }
}


const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialstate)

    const Login = (userData) => {
        localStorage.setItem("Token",JSON.stringify(userData.token))

        dispatch({
            type: "LOGIN",
            payload: userData.user,
        })
    }

    const Logout = () => {
        localStorage.removeItem("Token")

        dispatch({
            type: "LOGOUT"
        })
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            const token = JSON.parse(localStorage.getItem("Token"));

            if(token) {
                try{
                    const response = await api.post("/get-current-user", {token})
                    if(response.data.success) {
                        dispatch({
                            type: "LOGIN",
                            payload: response.data.user
                        })
                    }else {
                        toast.error(response.data.message);
                    }
                } catch(error) {
                    console.log(error, "error in current user")
                }
            }
        };

        getCurrentUser();
    },[])

    return(
        <AuthContexts.Provider value={{state, Login, Logout}}>
            {children}
        </AuthContexts.Provider>
    )
}




export default AuthProvider;