import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export function ThreeDCardDemo({gender}) {
  const imageUrl = gender 
  ? "https://i.pinimg.com/1200x/01/02/ea/0102ea2768a9c06ce53710dcb7064a27.jpg"
  : "https://i.pinimg.com/1200x/e9/3a/cc/e93accfca67cb616635147f584c2bff9.jpg";

  return (
    <CardContainer>
      <CardBody className="bg-dark rounded-xl md:p-12 p-5 border md:w-[600px]">
        <CardItem
          translateZ="50"
          className="md:text-3xl text-2xl text-center font-bold text-white">
          {gender ? 
          "Elevate Your Game":"Help others elevate their game."
          }
        </CardItem>
        
        <CardItem
          translateZ="60"
          className="text-gray-300 text-center text-sm mt-2">
            {gender ? 
          "Get coached by pro players and reach your gaming goals":"Guide players to unlock their full potential."
          }
          
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={imageUrl}
            className="md:h-60 w-full object-cover rounded-xl"
            alt="Jett valorant" />
        </CardItem>

        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as={Link}
            to={gender ? "/coaches" : ""}
            className="px-4 py-2 text-black rounded-xl bg-neutral-100 text-sm">
            {gender ? "Find Coaches → " : "Be a coach → "}
          </CardItem>
          
          <CardItem
            translateZ={20}
            as={Link}
            to={gender ? "/signup" : ""}
            className="px-4 py-2 rounded-xl bg-black text-white text-sm">
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}