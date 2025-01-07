import React from "react";
import { getInitials } from "../other/Helper";

const ProfileInfoCard = ({ onLogout }) => {
  return (
    <div className="flex items-centre gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials("Jimmy Yang")}
      </div>
      <div>
        <p className="text-sm font-medium">Jimmy</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
