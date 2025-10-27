import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("draft");
  const axiosPublic = useAxiosPublic();

  // Fetch blogs based on status
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

  // Handle blog actions (all restricted to admins)
  const handleAction = (action) => {
    Swal.fire({
      icon: "warning",
      title: "Access Denied!",
      text: `Only admins can ${action} blogs. Please contact an admin.`,
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <Link
          to="/dashboard/content-management/add-blog"
          className="px-6 py-2 font-semibold text-white transition rounded-lg shadow bg-gradient-to-r from-green-400 to-red-300 hover:opacity-90"
        >
          Add Blog
        </Link>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border-gray-300 rounded-lg select select-bordered"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="overflow-hidden transition bg-white shadow-lg cursor-pointer rounded-2xl hover:shadow-xl"
          >
            <div className="relative h-48">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  blog.status === "draft"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {blog.status.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col justify-between h-56 p-4">
              <div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {blog.content.slice(0, 120)}...
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    handleAction(
                      blog.status === "draft" ? "publish" : "unpublish"
                    )
                  }
                  className="flex-1 px-4 py-2 font-semibold text-white transition rounded-lg bg-gradient-to-r from-green-400 to-teal-400 hover:opacity-90"
                >
                  {blog.status === "draft" ? "Publish" : "Unpublish"}
                </button>

                <button
                  onClick={() => handleAction("delete")}
                  className="flex-1 px-4 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                >
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
