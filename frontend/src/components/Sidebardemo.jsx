import React, { lazy, Suspense, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconDashboard,
  IconLogin,
  IconMessage,
  IconUserBolt,
  IconWritingSign,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Routes, Route } from "react-router-dom";
import { coachStore, playerStore } from "../store/authStore";

const Home         = lazy(() => import("../pages/Home"));
const Profile      = lazy(() => import("../pages/Profile"));
const Coaches      = lazy(() => import("../pages/Coaches"));
const Login        = lazy(() => import("../pages/Login"));
const Signup       = lazy(() => import("../pages/Signup"));
const CoachProfile = lazy(() => import("../pages/CoachProfile"));
const CoachSignup  = lazy(() => import("../pages/CoachSignup"));
const CoachLogin   = lazy(() => import("../pages/CoachLogin"));
const Messages     = lazy(() => import("../pages/Messages"));
const CoachDashboard = lazy(() => import("../pages/CoachDashboard"));
const Reviews     = lazy(() => import("../pages/Reviews"));

const PageWrapper = ({ children }) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen w-full items-center justify-center bg-[#07090D]">
        <div className="text-center">
          <div className="mb-5 text-[10px] tracking-[0.18em] uppercase text-[#A01E2E]">
            Loading
          </div>
          <div className="relative w-[140px] h-[2px] bg-white/10 overflow-hidden rounded-full mx-auto">
            <div className="absolute inset-0 bg-[#A01E2E] animate-pulse" />
          </div>
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);

const NavIcon = ({ children }) => (
  <span className="text-white/35 group-hover:text-white/70 transition-colors duration-200 h-[18px] w-[18px] flex items-center justify-center flex-shrink-0">
    {children}
  </span>
);

export function SidebarDemo() {
  const navigate = useNavigate();
  const coach  = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);
  const logoutCoach  = coachStore((state) => state.logout);
  const logoutPlayer = playerStore((state) => state.logout);

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const links = [
    !coach && {
      label: "Coaches",
      to: "/coaches",
      icon: <NavIcon><IconBrandTabler className="h-[18px] w-[18px]" /></NavIcon>,
    },
    coach && {
      label: "Dashboard",
      to: "/dashboard",
      icon: <NavIcon><IconDashboard className="h-[18px] w-[18px]" /></NavIcon>,
    },
    (player || coach) && {
      label: "Messages",
      to: "/messages",
      icon: <NavIcon><IconMessage className="h-[18px] w-[18px]" /></NavIcon>,
    },
    (player || coach) && {
      label: "Review",
      to: "/reviews",
      icon: <NavIcon><IconWritingSign className="h-[18px] w-[18px]" /></NavIcon>,
    },
    player && {
      label: "Profile",
      to: "/profile",
      icon: <NavIcon><IconUserBolt className="h-[18px] w-[18px]" /></NavIcon>,
    },
    !player && !coach && {
      label: "Sign in",
      to: "/login",
      icon: <NavIcon><IconLogin className="h-[18px] w-[18px]" /></NavIcon>,
    },
    (player || coach) && {
      label: "Sign out",
      onClick: () => player ? logoutPlayer(navigate) : logoutCoach(navigate),
      icon: <NavIcon><IconArrowLeft className="h-[18px] w-[18px]" /></NavIcon>,
    },
  ].filter(Boolean);

  return (
    <div className={cn("flex flex-col md:flex-row w-full min-h-screen bg-[#07090D]")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 fixed z-50 bg-[#07090D] border-r border-white/[0.04]">

          {/* ── TOP: logo + nav links ── */}
          <div className="flex flex-col overflow-x-hidden">

            {/* Logo */}
            {open ? (
              <Logo setOpen={setOpen} />
            ) : (
              <LogoIcon />
            )}

            {/* Divider */}
            <div className="mt-5 mb-3 h-px bg-white/[0.04] mx-1" />

            {/* Nav links */}
            <div className="flex flex-col gap-0.5">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    onClick: () => {
                      if (link.onClick) link.onClick();
                      close();
                    },
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── BOTTOM: user identity card ── */}
          {(player || coach) && (
            <UserCard
              open={open}
              name={player?.fullname || coach?.fullname}
              role={
                coach
                  ? `Coach · ${coach?.rank || ""}`
                  : player?.rank || "Player"
              }
              pic={
                player?.profilePic ||
                coach?.profilePic ||
                "https://cdn-icons-png.flaticon.com/128/149/149071.png"
              }
              isCoach={!!coach}
            />
          )}

        </SidebarBody>
      </Sidebar>

      {/* ── Main content ── */}
      <Dashboard />
    </div>
  );
}

const UserCard = ({ open, name, role, pic, isCoach }) => (
  <div className={cn(
    "flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] transition-all duration-200",
    open ? "px-3 py-2.5" : "p-1.5 justify-center"
  )}>
    {/* Avatar with rank ring */}
    <div className="relative shrink-0">
      <img
        src={pic}
        alt={name}
        className="h-7 w-7 rounded-full object-cover border border-white/10"
      />
      {/* Online dot */}
      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#A01E2E] border border-[#07090D]" />
    </div>

    {/* Name + role — only visible when expanded */}
    {open && (
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="text-[12px] font-semibold text-white/80 truncate leading-tight">
          {name}
        </p>
        <p className="text-[9.5px] uppercase tracking-[0.12em] text-white/25 truncate mt-0.5">
          {role}
        </p>
      </div>
    )}

    {/* Coach badge — only visible when expanded */}
    {open && isCoach && (
      <span className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#A01E2E] border border-[#A01E2E]/40 rounded px-1.5 py-0.5">
        Coach
      </span>
    )}
  </div>
);

export const Logo = ({ setOpen }) => (
  <Link to="/" onClick={() => setOpen?.(false)} className="flex items-center gap-2.5 group">
    {/* Geometric logomark */}
    <div className="w-6 h-6 rounded-[5px] bg-[#A01E2E] flex items-center justify-center shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1L11 10H1L6 1Z" fill="white" fillOpacity="0.9" />
      </svg>
    </div>
    <span
      className="text-[14px] font-black text-white tracking-[0.16em] uppercase leading-none"
      style={{ fontFamily: "Syne, sans-serif" }}
    >
      ELEVATE
    </span>
  </Link>
);

export const LogoIcon = () => (
  <Link to="/" className="flex items-center justify-center">
    <div className="w-6 h-6 rounded-[5px] bg-[#A01E2E] flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1L11 10H1L6 1Z" fill="white" fillOpacity="0.9" />
      </svg>
    </div>
  </Link>
);

const Dashboard = () => (
  <div className="w-full">
    <Routes>
      <Route path="/"                element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="/coaches"         element={<PageWrapper><Coaches /></PageWrapper>} />
      <Route path="/profile"         element={<PageWrapper><Profile /></PageWrapper>} />
      <Route path="/coach-profile/:id" element={<PageWrapper><CoachProfile /></PageWrapper>} />
      <Route path="/login"           element={<PageWrapper><Login /></PageWrapper>} />
      <Route path="/signup"          element={<PageWrapper><Signup /></PageWrapper>} />
      <Route path="/coach-login"     element={<PageWrapper><CoachLogin /></PageWrapper>} />
      <Route path="/coach-signup"    element={<PageWrapper><CoachSignup /></PageWrapper>} />
      <Route path="/dashboard"       element={<PageWrapper><CoachDashboard /></PageWrapper>} />
      <Route path="/messages"        element={<PageWrapper><Messages /></PageWrapper>} />
      <Route path="/reviews"        element={<PageWrapper><Reviews /></PageWrapper>} />
    </Routes>
  </div>
);