import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Blogs = () => {
  // State to store the blogs
  const [blogs, setBlogs] = useState([]);
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    // Fetch blog data from the public API
    AxiosPublic.get("/blogs/data")
      .then((res) => {
        // Log the response data to see the structure
        console.log(res.data);

        // Filter the blogs with a 'published' status
        const blogPublish = res.data.filter((blog) => blog.status === "published");
        setBlogs(blogPublish); // Set only the published blogs to state
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, [AxiosPublic]);

  return (
    <div className="container my-10 mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
      {blogs.length === 0 ? (
         
            <h1  className="text-center text-red-600 py-4">
              {`No donation blogs publish.please wait now coming soon`}
            </h1>
        
        ) :(blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 p-4 border-2  shadow-xl flex flex-col md:flex-row">
            <figure className="w-full md:w-1/3">
              <img
                className="w-full h-[200px] object-cover rounded-md"
                src={blog.thumbnail}
                alt="Blog Thumbnail"
              />
            </figure>
            <div className="card-body p-4 md:w-2/3">
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="md:pr-32">
                {blog.content.slice(0, 150)}...
                <Link to={`/blogs/${blog._id}`} className="text-blue-500 inline-block">
                  Read More
                </Link>
              </p>
              <h3 className="text-lg mt-2">Deadline: {blog.date}</h3>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Blogs;
