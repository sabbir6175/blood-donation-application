
import  {useState} from "react";

const Gallery = () => {

    const [hovered, setHovered] = useState(null);
     const images = [
        "https://i.ibb.co.com/SwsdtJ69/gallery-1.webp",
"https://i.ibb.co.com/DH3md3N0/gallery-2.webp",
"https://i.ibb.co.com/pj4M44KJ/gallery-3.webp",
"https://i.ibb.co.com/TBn9xpb8/gallery-4.webp",
"https://i.ibb.co.com/twTnLbMc/gallery-5.webp",
"https://i.ibb.co.com/XfR8YBbQ/gallery-6.webp"
    ];
    return (
        <>
         <div className="px-2">
        <h2 className="text-2xl md:text-4xl lg:text-4xl uppercase font-bold text-center text-[#000000]">
        CAMPAIGN GALLERY
        </h2>
        <img
          className="w-82 mx-auto"
          src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
          alt=""
        />
        
        <span className="max-w-3xl mx-auto text-center flex justify-center">our prestigious voluntary work on campaigns by the team</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10 px-10 md:px-20 ">
            {images.map((image, index) => (

                // card container
                <div
                    key={index}
                    className={`relative transition-all w-full h-[200px]   cursor-pointer duration-300 ease-in-out transform ${
                        hovered !== null && hovered !== index
                            ? "blur-sm scale-95"
                            : "scale-100"
                    } hover:scale-105 hover:z-10 hover:blur-none`}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                >

                    {/*  image  */}
                    <img
                        src={image}
                        alt="animated_card" className="w-full h-full bg-no-repeat object-fill rounded-md "/>
                </div>
            ))}
        </div>
        
        </>
     
    );
};

export default Gallery;
              