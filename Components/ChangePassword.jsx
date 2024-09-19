import { changePassword } from "@/api";
import React, { useState } from "react";
import { MdLock, MdPassword } from "react-icons/md";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPasword] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return toast.error("All the fields are Required!", 400);
    }

    if (currentPassword === newPassword) {
      return toast.error("Current and New Password Can't be same");
    }
    setLoading(true);
    await changePassword(currentPassword, newPassword, confirmNewPassword);
    setLoading(false);
  };
  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <form
        className="w-[450px] h-max flex justify-start items-center flex-col gap-[20px]"
        onSubmit={handlePasswordChange}
      >
        <div className="flex w-full h-[3.5rem] bg-white shadow rounded-md  gap-[10px] px-[10px] justify-start items-center ">
          <MdLock className="text-[35px]" />
          <input
            className="w-full h-[3rem] bg-transparent  border-none outline-none text-[18px]"
            type="text"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full mx-[10px] h-[3.5rem] bg-white shadow rounded-md  gap-[10px] px-[10px] justify-start items-center ">
          <MdPassword className="text-[35px]" />
          <input
            className="w-full h-full bg-transparent  border-none outline-none text-[18px]"
            type="text"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full h-[3.5rem] bg-white shadow rounded-md  gap-[10px] px-[10px] justify-start items-center ">
          <MdPassword className="text-[35px]" />
          <input
            className="w-full h-[3rem] bg-transparent  border-none outline-none text-[18px]"
            type="text"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPasword(e.target.value);
            }}
          />
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

export default ChangePassword;
