import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

// Cities data with placeholder images
const citiesData = [
  {
    id: 1,
    name: "Guwahati",
    image: "/api/placeholder/400/300",
    isNew: false
  },
  {
    id: 2,
    name: "BANGALORE",
    image: "/api/placeholder/400/300",
    isNew: false
  },
  {
    id: 3,
    name: "DELHI",
    image: "/api/placeholder/400/300",
    isNew: true
  },
  {
    id: 4,
    name: "KOLKATA",
    image: "/api/placeholder/400/300",
    isNew: false
  },
  {
    id: 5,
    name: "MUMBAI",
    image: "/api/placeholder/400/300",
    isNew: true
  },
  {
    id: 6,
    name: "CHENNAI",
    image: "/api/placeholder/400/300",
    isNew: false
  },
  {
    id: 7,
    name: "HYDERABAD",
    image: "/api/placeholder/400/300",
    isNew: true
  },
  {
    id: 8,
    name: "AHMEDABAD",
    image: "/api/placeholder/400/300",
    isNew: false
  }
];

export default function CitiesUI() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Update scroll buttons visibility
  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScrollButtons();
    
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  // Scroll handling
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      const container = scrollRef.current;
      
      // Smooth scroll
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Update active card indicator based on scroll position
      setTimeout(() => {
        const containerWidth = container.clientWidth;
        const scrollPosition = container.scrollLeft;
        const cardWidth = containerWidth / 2; // Approximate card width
        
        const newIndex = Math.round(scrollPosition / cardWidth);
        setActiveIndex(Math.max(0, Math.min(newIndex, citiesData.length - 1)));
      }, 300);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="relative mb-6">
        <div className="flex items-center gap-2">
          <motion.h2 
            className="text-2xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services area
          </motion.h2>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 500, 
              damping: 15,
              delay: 0.3 
            }}
          >
            <Badge className="bg-red-500 hover:bg-red-600">NEW</Badge>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      <div className="relative">
        {/* Left scroll button */}
        {canScrollLeft && (
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full w-10 h-10 shadow-lg flex items-center justify-center group"
            onClick={() => handleScroll('left')}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
        )}

        {/* Scrollable cities container */}
        <motion.div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {citiesData.map((city, index) => (
            <motion.div 
              key={city.id}
              className="flex-shrink-0 w-full sm:w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1 
              }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex h-24 w-full overflow-hidden">
                    <div className="w-1/3 relative">
                      <motion.div 
                        className="absolute inset-0 bg-blue-600/10"
                        whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.2)" }}
                      />
                      <img 
                        src={city.image} 
                        alt={city.name} 
                        className="h-full w-full object-cover"
                      />
                      {city.isNew && (
                        <motion.div 
                          className="absolute top-2 left-2"
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 15, 
                            delay: 0.3 + index * 0.1 
                          }}
                        >
                          <Badge className="bg-red-500 hover:bg-red-600 text-xs">NEW</Badge>
                        </motion.div>
                      )}
                    </div>
                    <div className="w-2/3 flex items-center justify-start pl-4 pr-2">
                      <div className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.7 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <MapPin size={18} className="text-blue-600" />
                        </motion.div>
                        <h3 className="font-semibold text-lg">{city.name}</h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Right scroll button */}
        {canScrollRight && (
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full w-10 h-10 shadow-lg flex items-center justify-center group"
            onClick={() => handleScroll('right')}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
        )}
      </div>

      {/* Dot indicators for mobile */}
      {isMobile && (
        <motion.div 
          className="flex justify-center gap-1 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {citiesData.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.clientWidth;
                  scrollRef.current.scrollTo({
                    left: index * (cardWidth / 2),
                    behavior: 'smooth'
                  });
                  setActiveIndex(index);
                }
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}