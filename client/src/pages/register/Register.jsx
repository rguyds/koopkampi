import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const group = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [groupState, setgroupState] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
 
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        group: group.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        usercode: usercode,
      };
      try {
        await axiosInstance.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">KOOPKAMPI</h3>
          <span className="loginDesc">
          Kakampi ng mga Nakakaligtaang Sektor ng Lipunan.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <div >
                <select 
                // required  
                placeholder="Please select your group" 
                className="loginInput"  
                value={groupState} 
                ref={group}
                onChange={(e)=>{
                    const selectedGroup = e.target.value;
                    setgroupState(selectedGroup);                 
                    }}
                >
                        <option key = "1" value="1">Please select your group</option>
                        <option key = "2" value="task force kasanag">task force kasanag</option>
                        <option key = "3"  value="multi sectoral aliance group">multi sectoral aliance group</option>
                        <option key = "4"  value="cooperative members and advocate">cooperative members and advocate</option>
                        <option key = "5"  value="phil. asso. of water district">phil. asso. of water district</option>
                        <option key = "6"  value="alliance of pwd's members">alliance of pwd's members</option>
                        <option key = "7"  value="transport group">transport group</option>
                        <option key = "8"  value="knights of rizal">knights of rizal</option>
                        <option key = "9"  value="sorsogon 1st district">sorsogon 1st district</option>
                        <option key = "10"  value="sorsogon 2nd district">sorsogon 2nd district</option>
                </select>
              
            </div>

            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" type="submit">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}