import { Link } from 'react-router-dom';

const Blogs = () => {
  // Sample blog data
  const blogs = [
    { id: 1, title: 'Blog 1', excerpt: 'This is a short excerpt of Blog 1', date: '2025-02-01', author: 'Author 1' },
    { id: 2, title: 'Blog 2', excerpt: 'This is a short excerpt of Blog 2', date: '2025-02-02', author: 'Author 2' },
    // Add more blogs as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.excerpt}</p>
            <div className="mt-4">
              <span className="text-sm text-gray-500">By {blog.author}</span> | <span className="text-sm text-gray-500">{blog.date}</span>
            </div>
            <Link to={`/blogs/${blog.id}`} className="text-blue-500 mt-4 inline-block">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
