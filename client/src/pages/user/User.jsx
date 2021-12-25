import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import axios from "axios";
import "./user.css";
import { useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function User() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user,dispatch} =  useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [Username, setUsername] = useState();
  const [Email, setEmail] = useState("");
  const [Fullname, setFullname] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  
  console.log(user);
  let onUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };
  let onEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  let onFullname = (e) => {
    const newFullname = e.target.value;
    setFullname(newFullname);
  };
  let onPhone = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  };
  let onAddress = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username:  Username,
      email: Email,
      fullname: Fullname,
      phone: Phone,
      address: Address,
    };
    if (file) {
      const data = new FormData();
      const filename = data.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.put("/users/" + user._id, updatedUser);
      history.push("/profile/" + updatedUser.username);
      setSuccess(true);
      } catch (err) {
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              //   src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowFullname">{user.fullname}</span>
              <span className="userShowUserTitle">{user.group}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">1964.03.10</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleClick}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={onUsername}
                />
                
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.fullname}
                  className="userUpdateInput"
                  onChange={onFullname}
                />
                
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={onEmail}
                />
              </div>
              <div className="userUpdateItem">
                <label>Telephone</label>
                <input
                  type="text"
                  placeholder={user.phone}
                  className="userUpdateInput"
                  onChange={onPhone}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address}
                  className="userUpdateInput"
                  onChange={onAddress}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" type="submit">Update</button>
              {success && (
                <span style={{color:"green", textAlign:"center",margin:"10px"}}>
                    Profile has been updated...
                  </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
