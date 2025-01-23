import React, { useState } from "react";

const BlogCard = ( {postTitle, postPic, postContent, createdAt, coachName, profilePic, rank} ) => {
  
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = (e) => {
    e.preventDefault();
    setReadMore(!readMore);
  }

  return (
    <div className="mb-5 border-black shadow-lg rounded-lg max-w-lg md:mx-auto">
      <div className="py-2 px-6 border-b-[1px] flex items-center gap-2">
        <img className="size-16 rounded-full" src={profilePic || "http://localhost:5173/src/assets/authImages/Two.png"} alt="" />
        <div>
          <p className="font-semibold text-lg">{coachName}</p>
          <p>{rank}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="px-6 pt-4 space-y-3">
        <h3 className="text-2xl text-center font-bold line-clamp-2">
          {postTitle}
        </h3>

        <p className={`text-sm ${!readMore ? 'line-clamp-3' : ''}`}>
          {postContent}
        </p>

        <div className="flex justify-between items-center text-sm">
          <span>Created at - {new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {postPic !== "" &&
        <div className="pb-5 relative h-[40vh]">
            <img
            src={
                postPic ||
                "https://i.pinimg.com/236x/08/1c/c7/081cc7ec0a293ef3d9ee4ffb8dad1abc.jpg"
            }
            alt="Blog"
            className="w-full h-full rounded-xl object-cover"
            />
        </div>
      }

      <div className="text-center pb-5">
          <button onClick={handleReadMore} className="bg-gradient-to-r from-purple-500 to-blue-500 font-bold px-4 py-1 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
            {readMore ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

