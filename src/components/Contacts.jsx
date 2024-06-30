import React, { useState, useEffect } from "react";

import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat, setflag, flag }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  console.log("contacts is", contacts);
  useEffect(() => {
    const fun1 = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    fun1();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && (
        <div
          className={`flex flex-col  max-[550px]:${
            flag === 0 ? "block w-full" : "hidden  w-0 overflow-hidden"
          } min-[550px]:w-full h-full  min-[550px]:border-r-blue-100   min-[550px]:border-[5px]`}
        >
          <div
            className=" flex  h-fit gap-4 items-center w-full
          min-[550px]:border-b-white  min-[550px]:border-[5px] 
           p-4 bg-richblack-900 justify-center font-bold "
          >
            <img src={Logo} alt="logo" className="w-[40px] h-[40px]" />
            <h3 className="text-xl text-white ">SNOOPY</h3>
          </div>
          <div className="h-[calc(100%-100px)]  mx-3 flex flex-col   items-center gap-2 pt-2 pb-2  overflow-y-scroll  ">
            <div className="w-[95%]">
              {contacts?.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={` ${
                      index === currentSelected
                        ? "bg-caribbeangreen-200 p-2 rounded-lg"
                        : ""
                    } flex gap-3 items-center justify-center rounded-lg  max-[550px]:bg-pink-900  max-[550px]:p-3`}
                    onClick={() => {
                      changeCurrentChat(index, contact);
                      setflag(1);
                    }}
                  >
                    <div className="w-[40px] h-[40px]">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="text-white font-bold text-xl pb-3 md:pb-0 pt-1  min-[1000px]:pt-0">
                      <h3>{contact?.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex gap-4    min-[550px]:border-t-white  min-[550px]:border-[5px] items-center  p-4 bg-richblack-900 justify-center font-bold ">
            <div className="flex gap-4 items-center w-full justify-center ">
              <div className=" w-[60px] h-[60px] ">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="text-2xl font-bold text-white ">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
