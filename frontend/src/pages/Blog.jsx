import React, { useEffect, useState } from "react";
import { coachStore } from "../store/authStore";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const coach = coachStore((state) => state.coach);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/blog/blogs");
        setBlogs(res.data.data); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <h1 className="text-center text-4xl md:text-5xl font-bold pt-6 mb-8">
        📖 Read Latest Blogs
      </h1>

      {coach && (
        <div className="fixed bottom-10 right-10">
          <button
            onClick={() => navigate("/create-blog")}
            className="bg-gradient-to-r text-white from-purple-500 to-blue-500 font-bold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            ✍️ Write a Blog
          </button>
        </div>
      )}

      <div className="grid gap-6 px-10 max-w-3xl mx-auto">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog?._id} blog={blog} />
          ))
        ) : (
          <p className="text-center text-xl">No blogs found!</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
