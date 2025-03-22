import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaLock, FaEnvelope, FaCamera, FaTrash } from "react-icons/fa";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    full_name: "",
    contact_phone: "",
    address: "",
    email: "",
    password: "",
    profile_image: "",
  });

  useEffect(() => {
    const loginData = localStorage.getItem("loginResponse");
    if (loginData) {
      const parsedData = JSON.parse(loginData);
      setProfileData({
        full_name: parsedData.user?.full_name || "",
        contact_phone: parsedData.user?.contact_phone || "",
        address: parsedData.user?.address || "",
        email: parsedData.user?.email || "",
        password: "",
        profile_image: parsedData.user?.profile_image || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, profile_image: imageUrl });
    }
  };

  const handleRemoveImage = () => {
    setProfileData({ ...profileData, profile_image: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      ...JSON.parse(localStorage.getItem("loginResponse")!),
      user: profileData,
    };
    localStorage.setItem("loginResponse", JSON.stringify(updatedData));
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto bg-green-100 p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Update Profile</h2>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <img
            src={profileData.profile_image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-400 object-cover mb-2"
          />
          <label className="absolute bottom-1 right-1 bg-green-600 p-2 rounded-full text-white cursor-pointer hover:bg-green-700 transition">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Remove Profile Image Option */}
        {profileData.profile_image && (
          <button
            onClick={handleRemoveImage}
            className="flex items-center gap-2 mt-2 text-red-600 font-semibold hover:text-red-700 transition"
          >
            <FaTrash />
            Remove Profile Image
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="flex items-center border-b-2 border-green-400 py-2">
          <FaUser className="text-green-600 mr-2" />
          <input
            type="text"
            name="full_name"
            value={profileData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full outline-none bg-transparent text-green-800 placeholder:text-green-600"
          />
        </div>

        {/* Contact Phone */}
        <div className="flex items-center border-b-2 border-green-400 py-2">
          <FaPhone className="text-green-600 mr-2" />
          <input
            type="text"
            name="contact_phone"
            value={profileData.contact_phone}
            onChange={handleChange}
            placeholder="Contact Phone"
            className="w-full outline-none bg-transparent text-green-800 placeholder:text-green-600"
          />
        </div>

        {/* Address */}
        <div className="flex items-center border-b-2 border-green-400 py-2">
          <FaMapMarkerAlt className="text-green-600 mr-2" />
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full outline-none bg-transparent text-green-800 placeholder:text-green-600"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border-b-2 border-green-400 py-2">
          <FaEnvelope className="text-green-600 mr-2" />
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full outline-none bg-transparent text-green-800 placeholder:text-green-600"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border-b-2 border-green-400 py-2">
          <FaLock className="text-green-600 mr-2" />
          <input
            type="password"
            name="password"
            value={profileData.password}
            onChange={handleChange}
            placeholder="Update Password"
            className="w-full outline-none bg-transparent text-green-800 placeholder:text-green-600"
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 mt-4 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
