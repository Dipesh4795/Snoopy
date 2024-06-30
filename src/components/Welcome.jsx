import React, { useState, useEffect } from "react";

import Robot from "../assets/robot.gif";
import Logout from "./Logout";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fun1 = () => {
      const user = JSON.parse(
        localStorage?.getItem(process.env.REACT_APP_LOCAL_KEY)
      );
      console.log(user);
      setUserName(user?.username);
    };
    fun1();
  }, []);

  return (
    <div className=" flex flex-col  w-full h-screen   gap-4 items-center justify-center bg-richblue-500">
      <Logout />
      {/* <div className="hidden min-[550px]:block"> */}
      <div className="  w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-cover object-center">
        <img src={Robot} alt="" />
      </div>
      {/* </div> */}
      {/* <div className="hidden min-[550px]:block"> */}
      <div className="absolute  flex flex-col items-center  top-[350px] md:top-[400px] pl-5">
        <h1 className="text-white font-bold">
          Welcome,{" "}
          <span className="text-pink-500 font-extrabold pl-1 text-xl ">
            {userName}!
          </span>
        </h1>
        <h3 className="text-white font-bold">
          Please select a chat to Start messaging.
        </h3>
      </div>
    </div>
  );
}
