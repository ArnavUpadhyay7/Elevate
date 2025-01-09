import React, { useEffect, useState } from "react";
import { coachStore } from "../store/authStore";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const coach = coachStore((state) => state.coach);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blog/blogs");
        setBlogs(res.data.data); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  
  return (
    <div className="pb-10">
      <h1 className="text-center text-3xl md:text-5xl font-semibold pt-4">Read Latest Blogs</h1>
      {coach && (
        <div className="absolute bottom-10 right-20">
          <button
            onClick={() => navigate("/create-blog")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-20 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Write a Blog
          </button>
        </div>
      )}

      <div className="pt-12 gap-6 px-10">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog?._id}
              postTitle={blog?.postTitle} 
              postContent={blog?.postContent}
              postPic={blog?.postPic}
              coachName={blog?.coachId?.fullname}
              profilePic={blog?.coachId?.profilePic}
              rank={blog?.coachId?.rank}
              createdAt={blog?.createdAt}
            />
          ))
        ) : (
          <p className="text-center text-xl text-gray-500">No blogs found!</p>
        )}
      </div>

    </div>
  );
};

export default Blog;
