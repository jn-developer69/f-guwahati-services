import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, MessageSquare, Phone, Search, Shield, Star } from "lucide-react";
import { useEffect, useState } from "react";

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-full min-h-[200px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Service image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </AnimatePresence>
      
      {/* Navigation arrows */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft size={20} />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight size={20} />
      </motion.button>
      
      {/* Indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


export default function  ServiceCard({ listing }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Slider */}
        <div className="w-full md:w-1/3 relative">
          <ImageSlider images={listing.images} />
        </div>
        
        {/* Content */}
        <div className="w-full md:w-2/3 p-4">
          <div className="flex justify-between items-start">
            <div>
              {/* Title */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-800 text-white p-1 rounded">
                  <Award size={16} />
                </div>
                <h2 className="text-lg font-semibold text-black">{listing.name}</h2>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mt-1 flex-wrap gap-2">
                <div className="bg-green-600 text-white text-sm px-2 py-0.5 rounded flex items-center">
                  <span>{listing.rating}</span>
                  <Star size={12} className="ml-0.5 fill-white" />
                </div>
                <span className="text-sm text-gray-600 ml-2">{listing.reviewCount} Ratings</span>
                
                {/* Badges */}
                <div className="flex ml-2 gap-1">
                  {listing.trusted && (
                    <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                      <Shield size={10} className="mr-0.5" />
                      Trust
                    </span>
                  )}
                  {listing.verified && (
                    <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                      Verified
                    </span>
                  )}
                  {listing.topSearch && (
                    <span className="flex items-center text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                      <Search size={10} className="mr-0.5" />
                      Top Search
                    </span>
                  )}
                </div>
              </div>
              
              {/* Address */}
              <div className="flex items-start mt-2">
                <div className="mt-0.5 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 ml-1">{listing.address}</p>
              </div>
              
              {/* Services */}
              <div className="flex flex-wrap mt-3 gap-2">
                {listing.services.map((service, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex mt-4 gap-2 flex-wrap">
            <a href={`tel:${listing.phone}`} className="flex-1">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                <Phone size={16} />
                <span>{listing.phone}</span>
              </motion.button>
            </a>
            <a href={`https://wa.me/${listing.phone}`} className="flex-1">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4 fill-white">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span>WhatsApp</span>
              </motion.button>
            </a>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              <MessageSquare size={16} />
              <span>Send Enquiry</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}