import { useContext, useState } from "react";
import { SiGnu } from "react-icons/si";
import AuthContext from "../../../AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SignUp = () => {
  const { setUser, createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState(""); 
  const [loading, setLoading] = useState(false); 

  // Image upload to ImgBB
  const handleImageUpload = async (file) => {
    setLoading(true); 
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log('image bb te upload image',import.meta.env.VITE_IMAGE_KEY);

      const data = await response.json();
      if (data && data.data && data.data.url) {
        setPhotoURL(data.data.url);
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state after upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const role = "donor";
    const status = "active";

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match, please check your password.");
      return;
    } else {
      setError(""); // Clear error if passwords match
    }

    const data = {
      name,
      email,
      password: newPassword,
      photo: photoURL, 
      bloodGroup,
      district,
      upazila,
    };
    console.log(data);

    // Step 1: Create the user using Firebase or any authentication service
    const result = await createUser(email, newPassword);
    setUser(result.user); // Set the user in AuthContext

    // Step 2: Update user profile with photo URL
    await updateUserProfile({ displayName: name, photoURL: photoURL });
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "User Create Successfully",
      showConfirmButton: false,
      timer: 1500
    });

    // Step 3: Send the user info to your backend to store in MongoDB
    const userInfo = {
      email: email,
      displayName: name,
      photoURL: photoURL,
      bloodGroup: bloodGroup,
      district: district,
      upazila: upazila,
      role: role,
      status: status,
    };

    // Make the POST request to save the user in the database
    const response = await axiosPublic.post("/users", userInfo);
    if (response.user) {
      console.log("User added to the database:", response.data);
    } else {
      console.error("Error saving user to the database");
    }

    // Step 4: Navigate to the home page or previous page
    navigate(location?.state ? location.state : "/");

    // catch (error) {
    //   console.error(error);
    //   toast.error("Error creating user.");
    // }
  };

  return (
    <div className=" py-10 px-2">
      <div className="  p-4 card border lg:w-5/12 mx-auto  ">
        <h2 className="text-3xl  text-center font-bold mb-4">
         Welcome SignUp
        </h2>
        <form onSubmit={handleSubmit} className=" space-y-4 ">
          {/* Name */}
          <div className="flex flex-col lg:flex-row  md:gap-4">
            <div className="form-control w-full lg:w-1/2">
              <label className="label font-bold">Name :</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name?"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control w-full lg:w-1/2">
              <label className="label font-bold">Email :</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email?"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row  w-full md:gap-4">
            {/* Avatar (Image Upload) */}
            <div className="form-control w-full lg:w-1/2">
              <label className="label font-bold">Upload Photo : </label>
              <input
                type="file"
                name="photo"
                className="input input-bordered w-full py-2"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                required
              />
              {loading && <div className="text-center mt-2">Uploading...</div>}
            </div>

            {/* Blood Group */}
            <div className="form-control w-full lg:w-1/2">
              <label className="label font-bold">Blood Group : </label>
              <select
                name="bloodGroup"
                className="select select-bordered w-full"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row md:gap-4 w-full">
            {/* District */}
            <div className="form-control w-full lg:w-1/2">
              <label className="label font-bold">District :</label>
              <select
                name="district"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select District</option>
                <option value="Bagerhat">Bagerhat</option>
                <option value="Bandarban">Bandarban</option>
                <option value="Barisal">Barisal</option>
                <option value="Bhola">Bhola</option>
                <option value="Bogra">Bogra</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Chandpur">Chandpur</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Chuadanga">Chuadanga</option>
                <option value="Cumilla">Cumilla</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Dinajpur">Dinajpur</option>
                <option value="Faridpur">Faridpur</option>
                <option value="Feni">Feni</option>
                <option value="Gaibandha">Gaibandha</option>
                <option value="Gazipur">Gazipur</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Habiganj">Habiganj</option>
                <option value="Jamuna">Jamuna</option>
                <option value="Jamalpur">Jamalpur</option>
                <option value="Jashore">Jashore</option>
                <option value="Jhalokathi">Jhalokathi</option>
                <option value="Jhenaidah">Jhenaidah</option>
                <option value="Khagrachari">Khagrachari</option>
                <option value="Khulna">Khulna</option>
                <option value="Kishoreganj">Kishoreganj</option>
                <option value="Kurigram">Kurigram</option>
                <option value="Kushtia">Kushtia</option>
                <option value="Lakshmipur">Lakshmipur</option>
                <option value="Lalmonirhat">Lalmonirhat</option>
                <option value="Manikganj">Manikganj</option>
                <option value="Meherpur">Meherpur</option>
                <option value="Moulvibazar">Moulvibazar</option>
                <option value="Munshiganj">Munshiganj</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Narail">Narail</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Narsingdi">Narsingdi</option>
                <option value="Netrokona">Netrokona</option>
                <option value="Nilphamari">Nilphamari</option>
                <option value="Noakhali">Noakhali</option>
                <option value="Pabna">Pabna</option>
                <option value="Panchagarh">Panchagarh</option>
                <option value="Patuakhali">Patuakhali</option>
                <option value="Pirojpur">Pirojpur</option>
                <option value="Rajbari">Rajbari</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Satkhira">Satkhira</option>
                <option value="Shariatpur">Shariatpur</option>
                <option value="Sherpur">Sherpur</option>
                <option value="Sirajganj">Sirajganj</option>
                <option value="Sunamganj">Sunamganj</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Tangail">Tangail</option>
                <option value="Thakurgaon">Thakurgaon</option>
              </select>
            </div>

            {/* Upazila */}
            <div className="form-control w-full lg:w-1/2">
              <label className="label font-bold">Upazila : </label>
              <select
                name="upazila"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Upazila</option>
                <option value="Mithapukur">Mithapukur</option>
                <option value="Pirgonj">Pirgonj</option>
                <option value="Kaunia">Kaunia</option>
                <option value="Pirgacha">Pirgacha</option>
                <option value="Panchagarh Sadar">Panchagarh Sadar</option>
                <option value="Birganj">Birganj</option>
                <option value="Dinajpur Sadar">Dinajpur Sadar</option>
                <option value="Thakurgaon Sadar">Thakurgaon Sadar</option>
                <option value="Kamalganj">Kamalganj</option>
                <option value="Cumilla">Cumilla</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Tangail">Tangail</option>
                <option value="Faridpur">Faridpur</option>
                <option value="Feni">Feni</option>
                <option value="Gaibandha">Gaibandha</option>
                <option value="Habiganj">Habiganj</option>
                <option value="Moulvibazar">Moulvibazar</option>
                <option value="Jhalokathi">Jhalokathi</option>
                <option value="Jhenaidah">Jhenaidah</option>
                <option value="Khulna">Khulna</option>
                <option value="Kurigram">Kurigram</option>
                <option value="Kushtia">Kushtia</option>
                <option value="Lakshmipur">Lakshmipur</option>
                <option value="Lalmonirhat">Lalmonirhat</option>
                <option value="Manikganj">Manikganj</option>
                <option value="Meherpur">Meherpur</option>
                <option value="Munshiganj">Munshiganj</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Narail">Narail</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Narsingdi">Narsingdi</option>
                <option value="Netrokona">Netrokona</option>
                <option value="Nilphamari">Nilphamari</option>
                <option value="Noakhali">Noakhali</option>
                <option value="Pabna">Pabna</option>
                <option value="Panchagarh">Panchagarh</option>
                <option value="Patuakhali">Patuakhali</option>
                <option value="Pirojpur">Pirojpur</option>
                <option value="Rajbari">Rajbari</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Satkhira">Satkhira</option>
                <option value="Shariatpur">Shariatpur</option>
                <option value="Sherpur">Sherpur</option>
                <option value="Sirajganj">Sirajganj</option>
                <option value="Sunamganj">Sunamganj</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Tangail">Tangail</option>
                <option value="Thakurgaon">Thakurgaon</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row md:gap-4 w-full">
            {/* Password */}
            <div className="form-control  w-full lg:w-1/2 ">
              <label className="label font-bold">Password : </label>
              <input
                type="password"
                name="newPassword"
                className="input input-bordered w-full"
                placeholder="Enter your password?"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-control  w-full lg:w-1/2">
              <label className="label font-bold">Confirm Password : </label>
              <input
                type="password"
                name="confirmPassword"
                className="input input-bordered w-full"
                placeholder="Enter your confirm password?"
                required
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}

          <button type="submit" className="btn bg-green-400 text-white w-full">
            <SiGnu /> Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/SignIn" className="text-green-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
