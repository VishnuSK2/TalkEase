import { useState } from "react";
import { useAuthStore } from "../../Store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500">Manage your profile information</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile
                  ? "animate-pulse pointer-events-none opacity-50"
                  : "hover:scale-105"
              }`}
            >
              <Camera className="w-5 h-5" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
            <User className="text-gray-600 w-5 h-5" />
            <div>
              <p className="text-gray-500 text-sm p-0 m-0">Full Name</p>
              <p className="font-medium text-gray-800 p-0 m-0">
                {authUser?.fullName || "N/A"}
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
            <Mail className="text-gray-600 w-5 h-5" />
            <div>
              <p className="text-gray-500 text-sm p-0 m-0">Email Address</p>
              <p className="font-medium text-gray-800 p-0 m-0 ">
                {authUser?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Account Information
          </h2>
          <div className="text-sm text-gray-600 space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Member Since</span>
              <span className="text-gray-800">
                {authUser?.createdAt?.split("T")[0] || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Account Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
