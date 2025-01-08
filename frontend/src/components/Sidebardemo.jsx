import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconDashboard, IconLogin, IconMessage, IconUserBolt, IconWritingSign } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";1
import Profile from "../pages/Profile";
import Blog from "../pages/Blog";
import Coaches from "../pages/Coaches";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CoachProfile from "../pages/CoachProfile";
import CoachSignup from "../pages/CoachSignup";
import CoachLogin from "../pages/CoachLogin";
import {coachStore, playerStore} from "../store/authStore";
import Messages from "../pages/Messages";

export function SidebarDemo() {
  const coach = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);
  const logoutCoach = coachStore((state) => (state.logout));
  const logoutPlayer = playerStore((state)=>(state.logout));

  const links = [
    !coach && {
      label: "Coaches",
      to: "/coaches",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    coach && 
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: (
        <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    (player || coach) && 
    {
      label: "My Messages",
      to: "/messages",
      icon: (
        <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    player && {
      label: "Profile",
      to: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Blogs",
      to: "/blog",
      icon: (
        <IconWritingSign className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    !player && !coach &&{
      label: "Sign in",
      to: "/login",
      icon: (
        <IconLogin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    player &&{
      label: "Logout",
      onClick: logoutPlayer,
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    coach &&{
      label: "Logout",
      onClick: logoutCoach,
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ].filter(Boolean);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col h-screen md:flex-row dark:bg-neutral-800 w-full overflow-x-hidden",
        "min-h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="fixed flex flex-col flex-1 overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {(player || coach) && 
            <div className="fixed bottom-10 flex flex-col flex-1 overflow-x-hidden">
              <SidebarLink
                link={{
                  label: "Arnav Upadhyay",
                  to: "/profile",
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          }
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Elevate
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/coach-profile/:id" element={<CoachProfile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/coach-login" element={<CoachLogin />} />
        <Route path="/coach-signup" element={<CoachSignup />} />
        <Route path="/dashboard" element={<CoachProfile />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
};
