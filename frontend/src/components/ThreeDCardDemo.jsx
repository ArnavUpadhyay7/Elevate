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
          translatez="50"
          className="text-white md:text-3xl text-2xl text-center font-bold">
          {gender ? 
          "Elevate Your Game 🚀":"Help others elevate their game."
          }
        </CardItem>
        
        <CardItem
          translatez="60"
          className="text-white text-center text-sm mt-2">
            {gender ? 
          "Get coached by pro players and reach your gaming goals":"Guide players to unlock their full potential."
          }
          
        </CardItem>

        <CardItem translatez="100" className="w-full mt-4">
          <img
            src={imageUrl}
            className="md:h-60 w-full object-cover rounded-xl"
            alt="Jett valorant" />
        </CardItem>

          {gender ? 
            <div className="flex justify-between items-center mt-8">
              <CardItem
                translatez={20}
                as={Link}
                to="/coaches" 
                className="px-4 py-2 rounded-xl bg-white text-black text-sm">
                Find Coaches
              </CardItem>
              
              <CardItem
                translatez={20}
                as={Link}
                to="/signup" 
                className="px-4 py-2 text-white rounded-xl bg-black text-sm">
                Sign up
              </CardItem>
            </div> : 
            <div className="flex justify-center items-center h-full mt-8">
              <CardItem
                translatez={20}
                as={Link}
                to="/coach-signup" 
                className="px-6 py-2 rounded-xl bg-white text-black text-sm">
                Be a coach →
              </CardItem>
            </div>
          }
      </CardBody>
    </CardContainer>
  );
}