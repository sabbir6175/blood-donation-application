import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const BlogDetailsPage = () => {
  const { id } = useParams();  // Use the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    // Fetch the details of a specific blog based on the ID
    AxiosPublic.get(`/blogs/data/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
      });
  }, [id, AxiosPublic]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto md:p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">All Blog Details</h1>
      <div className="flex flex-col  w-10/12 mx-auto p-2 md:p-5  gap-6">
        <div className="w-full ">
          <img
            src={blog.thumbnail}
            alt="Blog Thumbnail"
            className="w-full   h-auto lg:h-[400px] rounded-lg"
          />
        </div>
        <div className="w-full">
          <h1 className="text-xl font-bold"> {blog.title}</h1>
          <p className="text-lg mt-2 "><span className="font-bold">Descriptions :</span> {blog.content}</p>
          <h2 className="text-xl font-bold mt-4">Deadline: {blog.date}</h2>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
