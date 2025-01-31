import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('draft');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/blogs?status=${filter}`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [filter]);

  const handlePublish = async (id) => {
    try {
      await axios.post(`http://localhost:7000/api/blogs/publish/${id}`);
      setBlogs(blogs.map(blog => blog._id === id ? { ...blog, status: 'published' } : blog));
    } catch (error) {
      console.error('Error publishing the blog:', error);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await axios.post(`http://localhost:7000/api/blogs/unpublish/${id}`);
      setBlogs(blogs.map(blog => blog._id === id ? { ...blog, status: 'draft' } : blog));
    } catch (error) {
      console.error('Error unpublishing the blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting the blog:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
      <Link to="/dashboard/add-blog" className="btn btn-primary">Add Blog</Link>
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="select select-bordered mb-4"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog._id} className="card card-bordered">
            <div className="card-body">
              <h3 className="card-title">{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div className="card-actions">
                {blog.status === 'draft' ? (
                  <button className="btn btn-primary" onClick={() => handlePublish(blog._id)}>Publish</button>
                ) : (
                  <button className="btn btn-warning" onClick={() => handleUnpublish(blog._id)}>Unpublish</button>
                )}
                <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
