import { useState, useEffect, useContext } from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // Custom Axios hook
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Upazila from "../../../Hooks/Upazila";
import District from "../../../Hooks/District";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const AxiosPublic = useAxiosPublic();
  const [upazilas] = Upazila();
  const [districts] = District();
  const [isEditable, setIsEditable] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  useEffect(() => {
    // Fetching profile data
    AxiosPublic.get(`/users/${email}`)
      .then((response) => {
        setProfileData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  }, [email, AxiosPublic]);

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
    // console.log("Sending ID:", profileData._id, updatedData);

    AxiosPublic.put(`/users/${profileData._id}`, updatedData)
      .then(() => {
        toast.success("Profile updated successfully");
        setProfileData((prev) => ({
          ...prev,
          ...updatedData,
        })); // Update the profile data in state after successful save
        setIsEditable(false); // Turn off edit mode
      })
      .catch((error) => {
        toast.error("Failed to update profile");
        console.error("Error saving profile data", error);
      });
  };

  return (
    <div className="container mx-auto p-6 ">
      <div className=" bg-green-50 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center uppercase">
          {profileData.role} Profile
        </h1>
        <div className="w-4/12 md:w-1/5 h-[100px] md:h-[190px] rounded-full border-2 bg-white mx-auto">
          <img
            className="w-full h-full rounded-full"
            src={profileData.photoURL}
            alt="Profile"
          />
        </div>
        <div className="text-right">
          <button
            onClick={() => setIsEditable((prev) => !prev)}
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          >
            {isEditable ? "Cancel" : "Edit"}
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="mb-4 w-full">
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={profileData.displayName}
                disabled={!isEditable}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={profileData.email}
                disabled
                className="w-full p-2 border rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="mb-4 w-full">
              <label
                htmlFor="photoURL"
                className="block text-sm font-semibold mb-2"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                defaultValue={profileData.photoURL}
                disabled={!isEditable}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="district"
                className="block text-sm font-semibold mb-2"
              >
                District
              </label>
              <select
                type="text"
                id="district"
                name="district"
                disabled={!isEditable}
                className="w-full p-2 border rounded-lg"
              >
                {!isEditable ? (
                  <option value={profileData.district} selected>
                    {profileData.district}
                  </option>
                ) : districts.length > 0 ? (
                  <>
                    <option value="">Select District</option>
                    {districts.map((districtData) => (
                      <option key={districtData.id} value={districtData.name}>
                        {districtData.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="mb-4 w-full">
              <label
                htmlFor="upazila"
                className="block text-sm font-semibold mb-2"
              >
                Upazila
              </label>
              
              <select
                type="text"
                id="upazila"
                name="upazila"
                disabled={!isEditable}
                className="w-full p-2 border rounded-lg"
              >
                {!isEditable ? (
                  <option value={profileData.upazila} selected>
                    {profileData.upazila}
                  </option>
                ) : upazilas.length > 0 ? (
                  <>
                    <option value="">Select Upazila</option>
                    {upazilas.map((upazilaData) => (
                      <option key={upazilaData.id} value={upazilaData.name}>
                        {upazilaData.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="bloodGroup"
                className="block text-sm font-semibold mb-2"
              >
                Blood Group
              </label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                defaultValue={profileData.bloodGroup}
                disabled={!isEditable}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {isEditable && (
            <button
              type="submit"
              className="bg-green-500 w-full text-white py-2 px-4 rounded"
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
