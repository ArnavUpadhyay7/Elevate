import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { motion } from "framer-motion";
import { VideoIcon, Videotape } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { playerStore } from "../store/authStore";

export function AnimatedModalDemo({ coach, player }) {
  const navigate = useNavigate();
  const refreshPlayer = playerStore((state) => state.refreshPlayer);

  const handleBuyClick = async () => {
    try {
      const order = await axiosInstance.post(
        "/payment/create",
        {
          amount: coach?.rate,
          currency: "INR",
          receipt: "order_rcptid_1",
          notes: {
            coachEmail: coach?.email,
            playerEmail: player?.email,
          },
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Elevate",
        description: "Elevate Coaching Session",
        order_id: orderId,
        prefill: {
          name: notes.fullname,
          email: notes.email,
        },
        theme: {
          color: "#A01E2E",
        },

        handler: async function () {
          try {
            // Review doc + payed_coach already created at order creation time.
            // No need to wait for webhook — just refresh and navigate.
            await refreshPlayer();
            navigate("/reviews");
          } catch (err) {
            console.error("Post-payment refresh failed:", err);
            navigate("/reviews");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating payment order:", error.message);
    }
  };

  const images = [
    "https://i.pinimg.com/736x/08/5e/aa/085eaa8ccfa35e2f1c83d424b703eb66.jpg",
    "https://i.pinimg.com/736x/8b/38/b5/8b38b53e4727da8965afca2b64476ee4.jpg",
    "https://i.pinimg.com/736x/12/9b/81/129b81a5f3ea8d7a81375e45e1d02884.jpg",
    "https://i.pinimg.com/736x/76/f3/28/76f3284f77b0091bac48147612218033.jpg",
    "https://i.pinimg.com/736x/24/0c/9b/240c9b396d7a1a60e6338cd496ee151f.jpg",
  ];

  return (
    <div className="w-full">
      <Modal>
        <ModalTrigger className="w-full py-3 rounded-lg bg-[#A01E2E] hover:bg-[#8E1C2A] text-white text-[12.5px] font-semibold tracking-[0.02em] transition-colors duration-200">
          Book a Session
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-white text-lg md:text-2xl font-bold text-center mb-8">
              Book your Session{" "}
              <span className="px-1 py-0.5 rounded-md text-white/80 bg-white/10 border border-white/10">
                With {coach?.fullname}
              </span>{" "}
              now! 🚀
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{ rotate: Math.random() * 20 - 10 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                  whileTap={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt="valorant gameplay"
                    width="500"
                    height="500"
                    className="rounded-lg h-14 w-14 md:h-24 md:w-24 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="py-4 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex items-center justify-center">
                <VideoIcon className="mr-1 text-white/50 h-4 w-4" />
                <span className="text-white/60 text-sm">1 live session</span>
              </div>
              <div className="flex items-center justify-center">
                <Videotape className="mr-1 text-white/50 h-4 w-4" />
                <span className="text-white/60 text-sm">2 recorded sessions</span>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <button
              onClick={handleBuyClick}
              className="bg-[#A01E2E] hover:bg-[#8E1C2A] text-white text-sm px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 tracking-wide"
            >
              Book Now · ₹{coach?.rate}
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}