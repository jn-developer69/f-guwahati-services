import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for events
const events = [
  {
    id: 1,
    title: "Badshah Performing in Celebrity Night at JIMS",
    date: "11 Feb, 2022",
    time: "11:00 AM - 12:00 PM",
    thumbnail: "/api/placeholder/800/500",
    videoUrl: "https://www.youtube.com/embed/u5iYRgAFwL8",
    featured: true
  },
  {
    id: 2,
    title: "Workshop on Digital Marketing",
    date: "15 Mar, 2022",
    time: "2:00 PM - 4:00 PM",
    thumbnail: "/api/placeholder/400/300",
    instructor: "Dr. Roah Mathur and Mr. Amar Khan from JIMS"
  },
  {
    id: 3,
    title: "Vibrant Collage Making Competition",
    date: "20 Apr, 2022",
    time: "10:00 AM - 1:00 PM",
    thumbnail: "/api/placeholder/400/300",
    organizer: "SYNERGY Club"
  },
  {
    id: 4,
    title: "Annual Tech Fest",
    date: "5 May, 2022",
    time: "9:00 AM - 6:00 PM",
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 5,
    title: "Leadership Summit 2022",
    date: "12 Jun, 2022",
    time: "11:00 AM - 3:00 PM",
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 6,
    title: "Career Counseling Session",
    date: "25 Jul, 2022",
    time: "3:00 PM - 5:00 PM",
    thumbnail: "/api/placeholder/400/300"
  }
];

export default function EventsShowcase() {
  const [activeEvent, setActiveEvent] = useState(events.find(event => event.featured) || events[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Filter events excluding the active one
  const carouselEvents = events.filter(event => event.id !== activeEvent.id);

  // Handle automatic scrolling
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselEvents.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [carouselEvents.length, autoplay]);

  // Scroll to visible items
  useEffect(() => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.scrollTo({
        left: currentIndex * (itemWidth + 16), // 16 is the gap
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Navigation functions
  const goToPrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselEvents.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % carouselEvents.length
    );
  };

  // Select an event
  const selectEvent = (event) => {
    setAutoplay(false);
    setActiveEvent(event);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-600">
            LATEST VIDEOS
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md"
          >
            View All <ArrowRight size={14} />
          </motion.button>
        </motion.div>
        
        {/* Main content with compact layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Featured event - takes less space now */}
          <motion.div 
            className="md:col-span-7 bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeEvent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Compact video preview */}
                <div className="relative w-full pt-[50%]">
                  <div className="absolute inset-0">
                    <motion.img 
                      src={activeEvent.thumbnail}
                      alt={activeEvent.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    />
                    
                    {/* Play button with pulse effect */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative cursor-pointer"
                      >
                        <motion.div 
                          className="absolute inset-0 bg-blue-500 rounded-full"
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.7, 0, 0.7] 
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />
                        <div className="bg-blue-600 rounded-full p-3 relative z-10">
                          <Play size={20} className="text-white" fill="white" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Compact info section */}
                <div className="p-3 md:p-4">
                  <h2 className="text-base md:text-lg font-bold text-blue-900 mb-1 line-clamp-1">
                    {activeEvent.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-blue-800" />
                      {activeEvent.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-blue-800" />
                      {activeEvent.time}
                    </span>
                  </div>
                  
                  {activeEvent.videoUrl && (
                    <a 
                      href={activeEvent.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-700 font-medium hover:underline"
                    >
                      Watch on YouTube <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Event carousel - right side with multi-item view */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-xl shadow-md p-3 md:p-4 h-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-blue-900">All Videos</h3>
                
                {/* Navigation controls */}
                <div className="flex gap-1">
                  <motion.button 
                    onClick={goToPrev}
                    className="bg-blue-100 hover:bg-blue-200 rounded-full p-1"
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={16} className="text-blue-800" />
                  </motion.button>
                  <motion.button 
                    onClick={goToNext}
                    className="bg-blue-100 hover:bg-blue-200 rounded-full p-1"
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight size={16} className="text-blue-800" />
                  </motion.button>
                </div>
              </div>
              
              {/* Horizontal scrollable container */}
              <div className="relative h-full overflow-hidden">
                <div 
                  ref={carouselRef}
                  className="flex gap-4 overflow-x-auto hide-scrollbar pb-1 h-full"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onMouseEnter={() => setAutoplay(false)}
                  onMouseLeave={() => setAutoplay(true)}
                >
                  {carouselEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      onClick={() => selectEvent(event)}
                      className="flex-shrink-0 w-32 md:w-40 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      animate={{ 
                        opacity: index === currentIndex || 
                                 index === (currentIndex + 1) % carouselEvents.length || 
                                 index === (currentIndex + 2) % carouselEvents.length ? 1 : 0.4
                      }}
                    >
                      <div className="relative rounded-lg overflow-hidden">
                        <img 
                          src={event.thumbnail} 
                          alt={event.title}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                        
                        {/* Small indicator dot for current events */}
                        {index === currentIndex && (
                          <motion.div 
                            className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <h4 className="font-medium text-blue-900 text-xs line-clamp-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                          <Calendar size={10} className="text-blue-800" />
                          <span className="text-xs">{event.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Progress indicator */}
                <div className="flex justify-center gap-1 mt-3">
                  {carouselEvents.slice(0, Math.min(5, carouselEvents.length)).map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-gray-300"
                      animate={{
                        backgroundColor: idx === currentIndex % 5 ? '#3b82f6' : '#d1d5db',
                        scale: idx === currentIndex % 5 ? 1.2 : 1
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for hiding scrollbars */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}