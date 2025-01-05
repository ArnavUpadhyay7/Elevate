const AuthImagePattern = ({ title, subtitle }) => {
  const imgArr = [
    { src: "https://i.pinimg.com/236x/06/59/84/065984149e87ae7163bdfbabc4a8dccd.jpg", alt: "Image 1" },
    { src: "https://i.pinimg.com/474x/89/27/1b/89271b2c6627f330210a0177ca3aa38e.jpg", alt: "Image 2" },
    { src: "https://i.pinimg.com/236x/91/f6/54/91f6545ba467578cb57c89ec6ff5bad5.jpg", alt: "Image 3" },
    { src: "https://i.pinimg.com/736x/bc/ee/50/bcee501300ae4ded98f96166054d18ee.jpg", alt: "Image 4" },
    { src: "https://i.pinimg.com/236x/5a/25/80/5a25808edfad818fd3a30614f91525c7.jpg", alt: "Image 5" },
    { src: "https://i.pinimg.com/474x/70/bc/19/70bc195c0e21d8b29d30bce282dc48fb.jpg", alt: "Image 6" },
    { src: "https://i.pinimg.com/236x/13/10/87/131087556c65e7ed642af8c6fe91b85b.jpg", alt: "Image 7" },
    { src: "https://i.pinimg.com/236x/de/1b/c0/de1bc0c666d5546d45ae37ad8e926685.jpg", alt: "Image 8" },
    { src: "https://i.pinimg.com/236x/d0/41/1f/d0411f1112aed4e36e0634c17373345e.jpg", alt: "Image 9" },
  ];
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          
        {imgArr.map((image, i) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

          {/* {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`bg-[url(${imgArr.src})] bg-cover bg-center aspect-square rounded-2xl bg-primary/10 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              />
            ))} */}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
        
      </div>
    </div>
  );
};

export default AuthImagePattern;
