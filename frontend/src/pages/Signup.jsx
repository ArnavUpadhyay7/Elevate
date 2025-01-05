import { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Camera, Eye, EyeOff, Gamepad2, Loader2, Lock, Mail, TextIcon } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    profilePic: "",
    rank: "",
    role: "",
    about: "",
    playerCardImage: ""
  });
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#161b20] grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-4">
          {/* Logo */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 group">
              <h1 className="text-2xl font-bold">Create account</h1>
              <p className="text-base-content/60">Get ready to elevate your skills 🚀</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TextIcon className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 placeholder:text-gray-600`}
                  placeholder="Arnav Upadhyay"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 placeholder:text-gray-600`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 placeholder:text-gray-600`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Rank</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TextIcon className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full pl-10 placeholder:text-gray-600`}
                    placeholder="Radiant"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Role</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TextIcon className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full pl-10 placeholder:text-gray-600`}
                    placeholder="Duelists"
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">About you</span>
              </label>
              <div className="relative flex items-center">
                <textarea
                  type="text"
                  className={`input input-bordered w-full text-sm md:text-base h-24 pl-5 pt-2 tracking-tighter placeholder:text-gray-600`}
                  placeholder="Over 4 years of experience, with a winning streak of 12 games. I'm a professional gamer with a strong passion for gaming and a desire to compete at the highest level."
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Upload Profile Picture</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  className={`input input-bordered w-full text-sm md:text-base pl-5 tracking-tighter placeholder:text-gray-600`}
                  placeholder="Your image url here"
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                />
              </div>
            </div>

          {/* <div className="flex gap-5 pt-2">
            <div>
              <p className="label-text font-medium">Upload Profile Picture - </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src="https://assets.aceternity.com/manu.png"
                  alt="Profile"
                  className="size-14 rounded-full object-cover"
                />
                <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content
                  p-1 rounded-full cursor-pointer 
                `}
              >
                <Camera className="size-4 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                />
                </label>
              </div>
            </div>
          </div> */}

            {/* <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button> */}

          </form>

          <div className="text-center pt-2">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Get your free account rigth now!"}
        subtitle={"Sign up to explore new coaches and connect with them."}
      />
    </div>
  );
};
export default Signup;
