import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { Trash2, ThumbsUp, MessageCircle } from "lucide-react";
import { coachStore, playerStore } from "../store/authStore";
import toast from "react-hot-toast";

const BlogCard = ({ blog }) => {
  const player = playerStore((state) => state.player);
  const coach = coachStore((state) => state.coach);
  const { postTitle, postPic, postContent, createdAt, coachId, _id } = blog;
  const [readMore, setReadMore] = useState(false);
  const [likes, setLikes] = useState(blog.like);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(blog.comments || []);

  useEffect(()=>{
    
  }, [_id])

  const toggleReadMore = (e) => {
    e.preventDefault();
    setReadMore(!readMore);
  };

  const handleLike = async () => {
    try {
      if (!player) {
        toast.error("Only players can like posts");
        return;
      }
      const response = await axiosInstance.post(`/blog/${_id}/like`, {
        playerId: player._id,
      });
  
      if (response.status === 200) {
        setLikes(likes + 1);
        toast.success("You liked the post!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error liking the blog");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error liking the blog:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentText("")
    if (!player) {
      toast.error("Only players can comment");

      return;
    }
    if (commentText.trim() === "") return;

    try {
      const playerId = player?._id;
      const response = await axiosInstance.post(`/blog/${_id}/comment`, {
        commentText,
        playerId,
        playerName: player?.fullname,
        profilePic: player?.profilePic,
      });

      if (response.status === 200) {
        setComments(response.data.comments);
        setCommentText("");
        toast.success("Comment posted!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error liking the blog");
      } else {
        toast.error("An unexpected error occurred");
      }
      setCommentText("")
      console.error("Error liking the blog:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.delete(`/blog/${_id}`);
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting the blog");
      console.error("Error deleting the blog:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 space-y-4 max-w-lg mx-auto">
      {/* Author Info */}
      <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
        <img
          className="size-14 rounded-full"
          src={coachId.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
          // change this
          alt="Profile"
        />
        <div>
          <p className="font-semibold text-lg">{coachId.fullname}</p>
          <p className="text-sm text-gray-400">{coachId.rank}</p>
        </div>
      </div>

      {/* Blog Content */}
      <h3 className="text-2xl font-bold text-center">{postTitle}</h3>
      <p className={`text-sm ${!readMore ? "line-clamp-3" : ""}`}>
        {postContent}
      </p>

      {/* Image */}
      {postPic && (
        <div className="h-[40vh] overflow-hidden rounded-xl">
          <img
            src={postPic}
            alt="Blog"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center text-sm mt-3">
        <span>📅 {new Date(createdAt).toLocaleDateString()}</span>
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-blue-400"
          >
            <ThumbsUp className="size-5" /> {likes}
          </button>
          <button className="flex items-center gap-1 hover:text-green-400">
            <MessageCircle className="size-5" /> {comments.length}
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={toggleReadMore}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          {readMore ? "Show Less" : "Read More"}
        </button>
        {coach?._id === coachId._id ? (
          <button onClick={handleDelete} className="bg-red-500 px-3 py-2 rounded-lg flex items-center">
            <Trash2 className="size-5" /> Delete
          </button>
        ) : null}
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-700 pt-2">
        <h4 className="text-lg font-bold">💬 Comments</h4>
        <div className="py-2">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="bg-gray-800 flex items-center gap-2 p-2 my-1 rounded-lg">
                <img className="size-10 rounded-full" src={comment.playerProfilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"} alt="player-profile-picture" />
                <span className="font-semibold">{comment.playerName}: </span>{" "}
                {comment.commentText}
              </div>
            ))
          ) : (
            <div className="bg-gray-800 p-2 my-1 rounded-lg">Be the first one to comment</div>
          )}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="mt-3 flex gap-2">
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="bg-green-500 px-4 py-2 rounded-lg">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogCard;
