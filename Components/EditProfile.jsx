import { BASE_URL } from "@/api";
import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";

const EditProfile = ({ user, setUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      setLoading(true);
      toast.loading("Upading Profile...");
      const response = await fetch(`${BASE_URL}/user/edit-profile`, {
        method: "PUT",
        body: formData,
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();
      toast.dismiss();
      if (response.ok) {
        toast.success(result.message);
        setUser(result.user);
        setLoading(false);
      } else {
        toast.error(result.message || "Failed to Update profile.");
        setLoading(false);
      }
    } catch (error) {
      toast.dismiss();

      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAvatar(user.avatar || "");
  }, [user]);

  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <form
        className="w-[450px] h-max flex justify-start items-center flex-col gap-[20px]"
        onSubmit={handleProfileUpdate}
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            document.querySelector(".edit-input").click();
          }}
        >
          {avatar !== "" ? (
            <div className="flex justify-center overflow-hidden items-center uppercase text-[50px] font-[400]  w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] border rounded-full text-white">
              <img
                src={avatar}
                alt="Profile Image"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ) : (
            <div
              className={`flex justify-center items-center uppercase text-[30px] sm:text-[50px] font-[400]  w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-purple-700 rounded-full text-white`}
            >
              {user.firstName[0]}
            </div>
          )}
          <input
            className="hidden edit-input"
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .bmp, .tiff, .webp"
            onChange={handleFileChange}
          />
        </div>
        <div className="w-full h-max flex justify-start items-center gap-[20px] flex-col">
          <div className="flex w-full h-[3.5rem] bg-white shadow rounded-md  gap-[10px] px-[10px] justify-start items-center ">
            <MdAccountCircle className="text-[35px]" />
            <input
              className="w-full h-[3rem] bg-transparent  border-none outline-none text-[18px]"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full h-[3.5rem] bg-white shadow rounded-md  gap-[10px] px-[10px] justify-start items-center ">
            <MdAccountCircle className="text-[35px]" />
            <input
              className="w-full h-[3rem] bg-transparent  border-none outline-none text-[18px]"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="disabled:cursor-not-allowed button-gradient w-full h-[3.5rem] rounded-md text-white font-[600] text-[20px]"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
