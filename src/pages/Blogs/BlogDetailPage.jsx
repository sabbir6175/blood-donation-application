import { useParams } from 'react-router-dom';

const BlogDetailPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL

  // Sample blog content based on the ID
  const blog = {
    1: { title: 'Blog 1', content: 'This is the full content of Blog 1', date: '2025-02-01', author: 'Author 1' },
    2: { title: 'Blog 2', content: 'This is the full content of Blog 2', date: '2025-02-02', author: 'Author 2' },
    // Add more blog data as needed
  };

  const currentBlog = blog[id];

  if (!currentBlog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{currentBlog.title}</h1>
      <div className="mt-2 text-gray-600">
        <span>By {currentBlog.author}</span> | <span>{currentBlog.date}</span>
      </div>
      <div className="mt-4">
        <p>{currentBlog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
