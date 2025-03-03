import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

export const CreateBlog = () => {
    const [postTitle, setPostTitle] = useState("");
    const [postPic, setPostPic] = useState("");
    const [postContent, setPostContent] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axiosInstance.post("/blog/blog", {
          postTitle,
          postPic,
          postContent,
        });
  
        if (response.status === 201) {
          toast.success("Blog created successfully!");
          navigate("/blog");
        }
      } catch (error) {
        console.error("Error creating blog:", error);
        toast.error("Blog creation failed!");
      }
    };
  
    return (
      <div className="min-h-screen flex justify-center items-center p-6">
        <div className="shadow-lg rounded-lg w-full max-w-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Create Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="postTitle"
                className="block font-semibold mb-2"
              >
                Blog Title
              </label>
              <input
                type="text"
                className="w-full bg-[#1a2025] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your blog title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                required
              />
            </div>
  
            <div>
              <label
                htmlFor="postPic"
                className="block font-semibold mb-2"
              >
                Blog Image URL
              </label>
              <input
                type="text"
                className="w-full bg-[#1a2025] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog image URL"
                value={postPic}
                onChange={(e) => setPostPic(e.target.value)}
              />
            </div>
  
            <div>
              <label
                htmlFor="postContent"
                className="block font-semibold mb-2"
              >
                Blog Content
              </label>
              <textarea
                className="w-full bg-[#1a2025] border border-gray-300 rounded-lg px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog content here..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                required
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="text-white w-full py-3 rounded-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-transform duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };