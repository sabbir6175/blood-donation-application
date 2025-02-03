import { useState } from 'react';
import axios from 'axios';
import JoditEditor from "jodit-react";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic()

  const handleFileUpload = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file); // Appending the image file
    
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=7662248e39f4bdbdf6a5043ad0e447fd", // Replace with your ImgBB API key
        formData
      );

      if (response.data.success) {
        // Return the image URL
        return response.data.data.url;
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // If there's a file, upload it to ImgBB first
    let thumbnailUrl = "";
    if (thumbnail) {
      thumbnailUrl = await handleFileUpload(thumbnail);
    }
  
    if (!thumbnailUrl) {
      alert("Failed to upload image.");
      return;
    }
  
    // Create FormData for the blog content
    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnail", thumbnailUrl); // Use the ImgBB image URL
    formData.append("content", content);
    formData.append("date", new Date().toDateString());
    for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
    
    // Sending the formData object directly to axios
    try {
      const response = await axiosPublic.post("/blogs", formData);
  
      if (response.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your blog added successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting the blog!",
      });
    }
  };
  
 

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="input input-bordered w-full"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
        
        <JoditEditor
          value={content}
          onChange={setContent}
        />

        {loading && <p>Uploading image...</p>}
        
        <button type="submit" className="btn btn-primary">Create Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
