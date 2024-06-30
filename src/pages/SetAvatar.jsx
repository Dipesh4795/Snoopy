import React, { useEffect, useState } from "react";

import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { toast } from "react-hot-toast";
import { setAvatar } from "../service/opeartion/UserAPI";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../service/apiconnector";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    const fun1 = () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCAL_KEY))
        navigate("/login");
    };
    fun1();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_KEY)
      );

      await setAvatar({ navigate, user, image: avatars[selectedAvatar] });
    }
  };

  useEffect(() => {
    const fun1 = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        // const image = await axios.get(
        //   `${api}/${Math.round(Math.random() * 1000)}`
        // );

        const image = await apiConnector(
          "GET",
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fun1();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex w-full h-full bg-richblack-800 items-center justify-center">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="flex h-full w-full  gap-8  items-center justify-center flex-col">
          <div className="w-fit text-white text-xl ">
            Pick an Avatar as your profile picture
          </div>
          <div className="flex gap-4 w-fit ">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`w-[120px] h-[120px] ${
                    selectedAvatar === index
                      ? "bg-blue-50 rounded-full p-2"
                      : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={setProfilePicture}
            className="bg-blue-800 p-5 text-white w-fit   outline-richblack-400  rounded-lg   cursor-pointer text-xl hover:bg-richblue-300 "
          >
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
}
