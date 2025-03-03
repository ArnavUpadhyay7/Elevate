import React, { lazy, Suspense, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconDashboard,
  IconLogin,
  IconMessage,
  IconSettings,
  IconUserBolt,
  IconWritingSign,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Routes, Route } from "react-router-dom";
import { coachStore, playerStore } from "../store/authStore";
import { Loader } from "lucide-react";
import { CreateBlog } from "../pages/CreateBlog";
import Settings from "../pages/Settings";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Blog = lazy(() => import("../pages/Blog"));
const Coaches = lazy(() => import("../pages/Coaches"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const CoachProfile = lazy(() => import("../pages/CoachProfile"));
const CoachSignup = lazy(() => import("../pages/CoachSignup"));
const CoachLogin = lazy(() => import("../pages/CoachLogin"));
const Messages = lazy(() => import("../pages/Messages"));
const CoachDashboard = lazy(() => import("../pages/CoachDashboard"));

const PageWrapper = ({ children }) => (
  <Suspense
    fallback={
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    }
  >
    {children}
  </Suspense>
);

export function SidebarDemo() {
  const navigate = useNavigate();
  const coach = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);
  const logoutCoach = coachStore((state) => state.logout);
  const logoutPlayer = playerStore((state) => state.logout);

  const links = [
    !coach && {
      label: "Coaches",
      to: "/coaches",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    coach && {
      label: "Dashboard",
      to: "/dashboard",
      icon: (
        <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    (player || coach) && {
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
    !player &&
      !coach && {
        label: "Sign in",
        to: "/login",
        icon: (
          <IconLogin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
    player && {
      label: "Logout",
      onClick: () => logoutPlayer(navigate),
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    coach && {
      label: "Logout",
      onClick: () => logoutCoach(navigate),
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      to: "/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ].filter(Boolean);

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col h-screen md:flex-row w-full overflow-x-hidden",
        "min-h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 fixed z-50 bg-neutral-900">
          <div className="fixed flex flex-col flex-1 overflow-x-hidden">
            {open ? <Logo setOpen={setOpen} /> : <LogoIcon setOpen={setOpen} />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                // <SidebarLink key={idx} link={{...link, onClick: ()=> {
                //   setOpen(false);
                // }}} />
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    onClick: () => {
                      if (link.onClick) link.onClick(); // Call the original onClick logic (e.g., logout)
                      setOpen(false); // Close the sidebar
                    },
                  }}
                />
              ))}
            </div>
          </div>
          {(player || coach) && (
            <div className="fixed bottom-10 flex flex-col flex-1 overflow-x-hidden">
              <SidebarLink
                link={{
                  label: player?.fullname || coach?.fullname,
                  to: "#",
                  icon: (
                    <img
                      src={
                        player?.profilePic ||
                        coach?.profilePic ||
                        "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                      }
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          )}
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = ({ setOpen }) => {
  return (
    <Link
      to="/"
      onClick={() => setOpen(false)}
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <img
        className="size-6"
        src="https://cdn-icons-png.flaticon.com/128/17910/17910540.png"
        alt="Elevate Logo"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold whitespace-pre text-white"
      >
        Elevate
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link to="/">
      <img
        className="size-6"
        src="https://cdn-icons-png.flaticon.com/128/17910/17910540.png"
        alt="Elevate Logo"
      />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/coaches"
          element={
            <PageWrapper>
              <Coaches />
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper>
              <Profile />
            </PageWrapper>
          }
        />
        <Route
          path="/coach-profile/:id"
          element={
            <PageWrapper>
              <CoachProfile />
            </PageWrapper>
          }
        />
        <Route
          path="/blog"
          element={
            <PageWrapper>
              <Blog />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <Signup />
            </PageWrapper>
          }
        />
        <Route
          path="/coach-login"
          element={
            <PageWrapper>
              <CoachLogin />
            </PageWrapper>
          }
        />
        <Route
          path="/coach-signup"
          element={
            <PageWrapper>
              <CoachSignup />
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <CoachDashboard />
            </PageWrapper>
          }
        />
        <Route
          path="/messages"
          element={
            <PageWrapper>
              <Messages />
            </PageWrapper>
          }
        />
        <Route
          path="/create-blog"
          element={
            <PageWrapper>
              <CreateBlog />
            </PageWrapper>
          }
        />
        <Route
          path="/settings"
          element={
            <PageWrapper>
              <Settings />
            </PageWrapper>
          }
        />
      </Routes>
    </div>
  );
};
