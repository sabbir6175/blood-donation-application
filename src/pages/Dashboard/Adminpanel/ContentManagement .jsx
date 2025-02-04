import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [filter, axiosPublic]);



  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <Link to="/dashboard/content-management/add-blog" className="btn bg-green-500">
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
