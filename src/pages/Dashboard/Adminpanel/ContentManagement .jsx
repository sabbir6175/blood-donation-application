import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("draft");
  const axiosSecure = useAxiosSecure();
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
    // Call the API to publish the blog
    axiosSecure
      .put(`/blogs/publish/${id}`)
      .then((res) => {
        const updatedBlog = res.data;
        console.log(updatedBlog);
        // Update the state to reflect the published status
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, status: "published" } : blog
          )
        );
        toast.success(`Blog successfully published!`, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.error("Error details:", err);
        toast.error("Failed to publish the blog", {
          position: "top-center",
        });
      });
  };

  // Handle unpublishing the blog
  const handleUnpublish = (id) => {
    axiosSecure
      .put(`/blogs/unpublish/${id}`)
      .then((res) => {
        const updatedBlog = res.data;
        console.log(updatedBlog);
        // Update the state to reflect the draft status
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, status: "draft" } : blog
          )
        );
        toast.success(`Blog successfully unpublished!`, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.error("Error details:", err);
        toast.error("Failed to unpublish the blog", {
          position: "top-center",
        });
      });
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success(`Blog successfully deleted!`, {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error deleting the blog:", error);
      toast.error("Failed to delete the blog", {
        position: "top-center",
      });
    }
  };

  return (
    <div className=" p-4">
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
              <img
                className="w-full h-[200px]"
                src={blog.thumbnail}
                alt="Blog thumbnail"
              />
            </figure>
            <div className="card-body p-2">
              <h3 className="card-title">{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div className="card-actions">
                {blog.status === "draft" ? (
                  <button
                    className="btn bg-green-300"
                    onClick={() => handlePublish(blog._id)}
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    className="btn bg-green-300"
                    onClick={() => handleUnpublish(blog._id)}
                  >
                    Unpublish
                  </button>
                )}
                <button
                  className="btn btn-warning"
                  onClick={() => handleDelete(blog._id)}
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
