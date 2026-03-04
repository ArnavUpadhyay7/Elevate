import { cn } from "../../lib/utils";
import { pauseLenis, resumeLenis } from "../lenis";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export function Modal({ children }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({ children, className }) => {
  const { setOpen } = useModal();
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-center relative overflow-hidden",
        className
      )}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({ children, className }) => {
  const { open, setOpen } = useModal();
  const modalRef = useRef(null);

  useEffect(() => {
    if (open) {
      pauseLenis();
      document.body.style.overflow = "hidden";
    } else {
      resumeLenis();
      document.body.style.overflow = "auto";
    }
    return () => {
      resumeLenis();
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useOutsideClick(modalRef, () => setOpen(false));

  // Portal renders outside the entire React tree — escapes sticky/transform/overflow ancestors
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[99999] px-4"
          style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <motion.div
            ref={modalRef}
            className={cn(
              "w-full max-w-lg max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl relative flex flex-col",
              className
            )}
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const ModalContent = ({ children, className }) => (
  <div className={cn("flex flex-col flex-1 min-h-0 overflow-y-auto p-8", className)}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className }) => (
  <div className={cn("flex justify-end p-4 bg-neutral-900 rounded-b-2xl shrink-0", className)}>
    {children}
  </div>
);

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 group z-10 text-white/50 hover:text-white transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};