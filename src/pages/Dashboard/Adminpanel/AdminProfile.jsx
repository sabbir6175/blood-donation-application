import { useState, useEffect, useContext } from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // Custom Axios hook
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const AxiosPublic = useAxiosPublic();
  const [isEditable, setIsEditable] = useState(false);

  const [profileData, setProfileData] = useState([]);

  console.log(profileData);

  useEffect(() => {
    AxiosPublic.get(`/users/${email}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  }, [user, email, AxiosPublic]);

    const handleSave = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const photoURL = form.photoURL.value;
      const district = form.district.value;
      const upazila = form.upazila.value;
      const bloodGroup = form.bloodGroup.value;
      const save  = {email, photoURL, district, upazila, bloodGroup}
      console.log(save)

      AxiosPublic
        .put(`/users/${user._id}`, profileData)
        .then(() => {
          toast.success("Profile updated successfully");
          setIsEditable(false); // Turn off edit mode
        })
        .catch((error) => {
          toast.error("Failed to update profile");
          console.error("Error saving profile data", error);
        });
    };

  //   console.log("Profile Data in state: ", profileData); // Debugging profileData state

  return (
    <div className="container mx-auto p-6">
     

      <div className="bg-gradient-to-t from-red-400 to-green-300 p-6 rounded-lg shadow-md  ">
          <h1 className="text-3xl font-bold mb-6 text-center uppercase">{profileData.role} Profile</h1>
        <div className="w-1/5 h-[150px] rounded-full border-2 bg-white mx-auto">
            <img className="w-full h-full rounded-full " src={profileData.photoURL} alt="" />
        </div>
        <div className="text-right">
          <button
            onClick={() => setIsEditable((prev) => !prev)}
            className="bg-red-500 text-white py-2 px-4 rounded mb-4"
          >
            {isEditable ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* {
    "_id": "679c6aab015b6a4832bfdadc",
    "email": "masumbillah@gmail.com",
    "displayName": "masum",
    "photoURL": "https://i.ibb.co.com/hFr55t7Z/1699191905292.jpg",
    "bloodGroup": "AB+",
    "district": "Dhaka",
    "upazila": "Munshiganj",
    "role": "donor",
    "status": "active"
} */}

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
                className="w-full p-2 border rounded-lg  cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-3">
            <div className="mb-4 w-full">
              <label
                htmlFor="avatar"
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
              <input
                type="text"
                id="district"
                name="district"
                defaultValue={profileData.district}
                disabled={!isEditable}
                className="w-full p-2 border rounded-lg"
              />
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
              <input
                type="text"
                id="upazila"
                name="upazila"
                defaultValue={profileData.upazila}
                disabled={!isEditable}
                className="w-full p-2 border rounded-lg"
              />
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
                
              type="button"
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
