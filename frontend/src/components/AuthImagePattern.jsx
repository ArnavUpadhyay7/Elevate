import One from "../assets/authImages/One.png"
import Two from "../assets/authImages/Two.png"
import Three from "../assets/authImages/Three.png"
import Four from "../assets/authImages/Four.png"
import Five from "../assets/authImages/Five.png"
import Six from "../assets/authImages/Six.png"
import Seven from "../assets/authImages/Seven.png"
import Eight from "../assets/authImages/Eight.png"
import Nine from "../assets/authImages/Nine.png"

const AuthImagePattern = ({ title, subtitle }) => {
  const imgArr = [
    { src: One, alt: "Image 1" },
    { src: Two, alt: "Image 2" },
    { src: Three, alt: "Image 3" },
    { src: Four, alt: "Image 4" },
    { src: Five, alt: "Image 5" },
    { src: Six, alt: "Image 6" },
    { src: Seven, alt: "Image 7" },
    { src: Eight, alt: "Image 8" },
    { src: Nine, alt: "Image 9" },
  ];
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-2 mb-8">
          
        {imgArr.map((image, i) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
        
      </div>
    </div>
  );
};

export default AuthImagePattern;
