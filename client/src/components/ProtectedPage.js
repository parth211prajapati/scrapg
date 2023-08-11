import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loaderSlide";
import { SetUser } from "../redux/usersSlice";

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        <div className="flex justify-between items-center bg-primary p-5">
          <h1 className="text-2xl text-white cursor-pointer" onClick={()=>{navigate("/")}}>SCRAPG</h1>
          <div className="bg-white flex gap-1 items-center py-2 px-5 rounded">
            <i className="ri-shield-user-line"></i>
            <span className="underline cursor-pointer uppercase" onClick={()=>{
              if(user.role=="user"){
                navigate("/profile");
              }else{
                navigate("/admin");
              }
            }}>
              {user.name}
            </span>
            <i
              className="ri-logout-box-r-line ml-10"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
