import { useState } from 'react';
import axios from 'axios';
import JoditEditor from "jodit-react";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify'; // Import DOMPurify to sanitize the content

const AddBlog = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleFileUpload = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file); // Appending the image file
    
    try {
      const response = await axios.post(
       `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_KEY}`, // Replace with your ImgBB API key
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

   

    // Sanitize and extract plain text from content
    const sanitizedContent = DOMPurify.sanitize(content); 
    const plainContent = sanitizedContent.replace(/<\/?[^>]+(>|$)/g, ""); 
    const formValue = {
      title: e.target.title.value.trim(),
      thumbnail: thumbnailUrl,
      content: plainContent,
      date: new Date().toDateString(),
      status: "draft", // Default status
    };
    
    console.log(formValue);

    // Sending the formData object directly to axios
    try {
      const response = await axiosPublic.post("/blogs", formValue);
      console.log(response.data)
      if (response.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your blog was added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
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
   <div className='bg-slate-50'>
         <div className="max-w-3xl  mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          className="input input-bordered w-full"
          placeholder="Blog Title"
        />

        <input
          type="file"
          className="input input-bordered w-full py-2"
          name="img"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
        
        <JoditEditor
          value={content}
          onChange={setContent}
          name="description"
        />

        {loading && <p>Uploading image...</p>}
        
        <button type="submit" className="btn w-full text-black bg-gradient-to-r from-green-300 to-green-300">
          Create Blog
        </button>
      </form>
    </div>
   </div>
  );
};

export default AddBlog;
