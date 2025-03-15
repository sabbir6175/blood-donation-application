import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("draft");
  const axiosPublic = useAxiosPublic();

  // Fetching blogs based on status (draft or published)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosPublic.get(`/blogs?status=${filter}`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [filter, axiosPublic]);

  // Handle publishing the blog
  const handlePublish = (id) => {
    if (id) {
       Swal.fire({
          icon: "warning",
          title: "Permission Denied!",
          text: "You do not have permission to publish this blog. Only admins can perform this action.",
       });
    }
 };
 

  // Handle unpublishing the blog
  const handleUnpublish = (id) => {
    if (id) {
        Swal.fire({
           icon: "warning",
           title: "Action Not Allowed!",
           text: "Only admins can unpublish a blog. Please contact an admin for assistance.",
        });
     }
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
     if (id) {
      Swal.fire({
         icon: "warning",
         title: "Access Restricted!",
         text: "You are not allowed to delete this blog. Only admins can delete blogs.",
      });
   }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="mb-4">
          <Link
            to="/dashboard/content-management/add-blog"
            className="btn px-4 md:px-8  font-semibold  bg-red-400 text-white"
          >
            Add Blog
          </Link>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered mb-4"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 border p-5 shadow-xl">
            <figure>
              <img className="w-full h-[200px]" src={blog.thumbnail} alt="Blog thumbnail" />
            </figure>
            <div className="card-body p-2">
              <h3 className="card-title">{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div className="card-actions">
                {blog.status === "draft" ? (
                  <button className="btn bg-green-300" onClick={() => handlePublish(blog._id)}>
                    Publish
                  </button>
                ) : (
                  <button className="btn bg-green-300" onClick={() => handleUnpublish(blog._id)}>
                    Unpublish
                  </button>
                )}
                <button className="btn btn-warning" onClick={() => handleDelete(blog._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
