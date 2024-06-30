import React from "react";
import { useNavigate } from "react-router-dom";

import { RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from "../service/opeartion/UserAPI";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)
    )._id;

    await logout({ navigate, id });
    // const data = await axios.get(`${logoutRoute}/${id}`);
    // if (data.status === 200) {
    //   localStorage.clear();
    //   navigate("/login");
    // }
  };
  return (
    <div
      className=" absolute w-[50px] h-[50px]  top-2 right-4 text-2xl bg-richblack-900 flex items-center justify-center rounded-lg m-2"
      onClick={() => handleClick()}
    >
      <RiLogoutCircleRLine fill={"white"} size={30} />
    </div>
  );
}
