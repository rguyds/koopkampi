import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

// const INITIAL_STATE = {
//   user:JSON.parse(localStorage.getItem("user")) || null,
//   isFetching: false,
//   error: false,
// };


// const INITIAL_STATE = {
//   user:{
//     _id: "6186dffcfb9e28beb25365c4",//6171bb8ac1e11e8d7d477b9e",
//     username: "Butch",
//     email:"butch@yahoo.com",
//     profilePicture: "person/3.jpeg",
//     coverPicture: "",
//     isAdmin:false,
//     followers:[],
//     followings:[1,2,3],
//   },
//   isFetching: false,
//   error: false,
// };
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};