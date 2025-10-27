import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("draft");
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Fetch blogs by status
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosPublic.get(`/blogs?status=${filter}`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [filter, axiosPublic]);

  // Publish
  const handlePublish = (id) => {
    axiosSecure
      .put(`/blogs/publish/${id}`)
      .then(() => {
        setBlogs((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "published" } : b))
        );
        toast.success("Blog published successfully!");
      })
      .catch(() => toast.error("Failed to publish blog"));
  };

  // Unpublish
  const handleUnpublish = (id) => {
    axiosSecure
      .put(`/blogs/unpublish/${id}`)
      .then(() => {
        setBlogs((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "draft" } : b))
        );
        toast.success("Blog moved to draft!");
      })
      .catch(() => toast.error("Failed to unpublish blog"));
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <Link
          to="/dashboard/content-management/add-blog"
          className="px-6 py-2 font-semibold text-white transition rounded-lg shadow bg-gradient-to-r from-green-400 to-red-300 hover:opacity-90"
        >
          + Add New Blog
        </Link>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <div className="mt-20 text-lg text-center text-gray-500">
          No {filter} blogs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col overflow-hidden transition duration-300 bg-white border border-gray-100 rounded-sm shadow-sm hover:shadow-lg"
            >
              <figure className="w-full h-48 overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt="Blog thumbnail"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </figure>

              <div className="flex flex-col justify-between flex-grow p-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {blog.content.slice(0, 100)}...
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {blog.status === "draft" ? (
                    <button
                      onClick={() => handlePublish(blog._id)}
                      className="px-4 py-1 font-semibold text-white transition rounded-lg bg-gradient-to-r from-green-400 to-teal-400 hover:opacity-90"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnpublish(blog._id)}
                      className="px-4 py-1 font-semibold text-white transition rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 hover:opacity-90"
                    >
                      Unpublish
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-4 py-1 font-semibold text-white transition rounded-lg bg-gradient-to-r from-rose-400 to-red-500 hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
