import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../AuthContext/AuthContext";
import District from "../../../Hooks/District";
import Upazila from "../../../Hooks/Upazila";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const AxiosPublic = useAxiosPublic();
  const [upazilas] = Upazila();
  const [districts] = District();
  const [isEditable, setIsEditable] = useState(false);
  const [lastLoginTime, setLastLoginTime] = useState("");
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  useEffect(() => {
    if (user) {
      setLastLoginTime(
        new Date(Number(user.metadata.lastLoginAt)).toLocaleString()
      );
    }
    AxiosPublic.get(`/users/${email}`)
      .then((res) => setProfileData(res.data))
      .catch((err) => console.error("Error fetching profile data", err));
  }, [email, AxiosPublic, user]);

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      displayName: form.name.value,
      email: form.email.value,
      photoURL: form.photoURL.value,
      district: form.district.value,
      upazila: form.upazila.value,
      bloodGroup: form.bloodGroup.value,
    };

    AxiosPublic.put(`/users/${profileData._id}`, updatedData)
      .then(() => {
        toast.success("Profile updated successfully");
        setProfileData((prev) => ({ ...prev, ...updatedData }));
        setIsEditable(false);
      })
      .catch((err) => {
        toast.error("Failed to update profile");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#FFF8F9] to-[#F1F8E9] flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl p-6 border border-gray-100 shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl md:p-10">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-extrabold tracking-wide text-center text-gray-800 uppercase md:text-3xl">
          {profileData.role ? `${profileData.role} Profile` : "User Profile"}
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative overflow-hidden border-4 rounded-full shadow-md w-28 h-28 md:w-36 md:h-36 border-gradient-to-r from-green-400 to-pink-400">
            <img
              src={profileData.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            <strong>Last Login:</strong> {lastLoginTime || "N/A"}
          </p>
          <button
            onClick={() => setIsEditable((prev) => !prev)}
            className={`mt-4 px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all ${
              isEditable
                ? "bg-gray-400 text-white hover:bg-gray-500"
                : "bg-gradient-to-r from-green-400 to-pink-400 text-white hover:opacity-90"
            }`}
          >
            {isEditable ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          {/* Row 1 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <label className="block mb-1 font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={profileData.displayName}
                disabled={!isEditable}
                className="w-full p-3 transition border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={profileData.email}
                disabled
                className="w-full p-3 bg-gray-100 border rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <label className="block mb-1 font-semibold text-gray-700">
                Photo URL
              </label>
              <input
                type="text"
                name="photoURL"
                defaultValue={profileData.photoURL}
                disabled={!isEditable}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 font-semibold text-gray-700">
                District
              </label>
              <select
                name="district"
                disabled={!isEditable}
                defaultValue={profileData.district}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
              >
                {!isEditable ? (
                  <option>{profileData.district}</option>
                ) : (
                  <>
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <label className="block mb-1 font-semibold text-gray-700">
                Upazila
              </label>
              <select
                name="upazila"
                disabled={!isEditable}
                defaultValue={profileData.upazila}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
              >
                {!isEditable ? (
                  <option>{profileData.upazila}</option>
                ) : (
                  <>
                    <option value="">Select Upazila</option>
                    {upazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-1 font-semibold text-gray-700">
                Blood Group
              </label>
              <input
                type="text"
                name="bloodGroup"
                defaultValue={profileData.bloodGroup}
                disabled={!isEditable}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditable && (
            <button
              type="submit"
              className="w-full py-3 mt-4 font-semibold text-white transition rounded-full bg-gradient-to-r from-green-400 to-pink-400 hover:opacity-90"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
