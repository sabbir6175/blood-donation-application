import { useState, useEffect, useContext } from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // Custom Axios hook
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();

  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  
  // Fetch the profile data when the component mounts
  useEffect(() => {
    console.log("User from context: ", user);  // Check if user data is present

    if (user) {
        AxiosPublic
        .get(`/users/data`)
        .then((response) => {
          console.log("Profile Data:", response.data); // Check the structure of the response
          setProfileData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data", error);
        });
    }
  }, [user, AxiosPublic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

//   const handleSave = () => {
//     AxiosPublic
//       .put(`/user/profile/${user._id}`, profileData)
//       .then(() => {
//         toast.success("Profile updated successfully");
//         setIsEditable(false); // Turn off edit mode
//       })
//       .catch((error) => {
//         toast.error("Failed to update profile");
//         console.error("Error saving profile data", error);
//       });
//   };

//   console.log("Profile Data in state: ", profileData); // Debugging profileData state

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <button
          onClick={() => setIsEditable((prev) => !prev)}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          {isEditable ? "Cancel" : "Edit"}
        </button>

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.displayName || ""}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email || ""}
             
              disabled
              className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="avatar" className="block text-sm font-semibold mb-2">
              Photo URL
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={profileData.photoURL || ""}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-semibold mb-2">
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={profileData.district || ""}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="upazila" className="block text-sm font-semibold mb-2">
              Upazila
            </label>
            <input
              type="text"
              id="upazila"
              name="upazila"
              value={profileData.upazila || ""}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block text-sm font-semibold mb-2">
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={profileData.bloodGroup || ""}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {isEditable && (
            <button
              type="button"
              
              className="bg-green-500 text-white py-2 px-4 rounded"
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
