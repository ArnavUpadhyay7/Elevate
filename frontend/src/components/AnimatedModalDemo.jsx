import React from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger} from "./ui/animated-modal";
import { motion } from "framer-motion";
import { VideoIcon, Videotape } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import {useNavigate} from "react-router-dom";

export function AnimatedModalDemo({coach, player}) {
  const navigate = useNavigate();

  const handleBuyClick = async () => {
    try {
      const order = await axiosInstance.post(`/payment/create`, {
        amount: coach?.rate,
        currency: "INR",
        receipt: "order_rcptid_1",
        notes: {
          coachEmail: coach?.email,
          playerEmail: player?.email,
        }
      }, {withCredentials: true});

      const {amount, keyId, currency, notes, orderId} = order.data;

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
          color: '#F37254'
        },
        handler: function (res) {
          navigate("/messages");
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) { 
      console.error("Error making payment: ", error.message);
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
    (<div className="flex text-white items-center justify-center">
      <Modal>
        <ModalTrigger
          className="bg-white text-black border-[2px] font-semibold md:w-[10vw] flex justify-center group/modal-btn">
          <span
            className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Book a Session
          </span>
          <div
            className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🚀
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4
              className="text-white text-lg md:text-2xl font-bold text-center mb-8">
              Book your Session{" "}
              <span
                className="px-1 py-0.5 rounded-md text-zinc-900 bg-gray-100 border border-gray-200">
                With me
              </span>{" "}
              now! 🚀
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden">
                  <img
                    src={image}
                    alt="valo images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0" />
                </motion.div>
              ))}
            </div>
            <div
              className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex items-center justify-center">
                <VideoIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  1 live session
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Videotape className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  2 recorded sessions
                </span>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <button onClick={() => handleBuyClick()}
              className="bg-white text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>)
  );
}