import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    service: "AC Service",
    name: "Vijay Singh",
    date: "2025-05-02",
    rating: 5,
    image: "/api/placeholder/150/150",
    content: "I visited Vivo Service Centre for a phone repair, and I was extremely satisfied with the great service. The staff were helpful and efficient, and my phone was fixed in no time!"
  },
  {
    id: 2,
    service: "Refrigerator Repair",
    name: "Priya Patel",
    date: "2025-04-28",
    rating: 4,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "The technician arrived promptly and diagnosed the issue with my refrigerator quickly. Very professional service and reasonable pricing. Would recommend!"
  },
  {
    id: 3,
    service: "Washing Machine Service",
    name: "Rahul Sharma",
    date: "2025-05-01",
    rating: 5,
    image: "/api/placeholder/150/150",
    content: "Outstanding service! My washing machine was making strange noises, and the technician fixed it perfectly. The service was fast and the technician was very knowledgeable."
  },
  {
    id: 4,
    service: "Microwave Repair",
    name: "Ananya Gupta",
    date: "2025-04-25",
    rating: 5,
    image: "/api/placeholder/150/150",
    content: "Excellent service! My microwave wasn't heating properly, and now it works like new. The technician was polite and explained the issue clearly."
  },
  {
    id: 5,
    service: "TV Installation",
    name: "Arjun Mehta",
    date: "2025-04-30",
    rating: 4,
    image: "/api/placeholder/150/150",
    content: "Very professional TV installation service. The technician was careful with my new TV and took time to explain all the features. Great experience overall!"
  }
];

// Rating Stars Component
const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isActive }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25, 
        mass: 1
      }}
      className={`w-full ${isActive ? "z-10" : "z-0"}`}
    >
      <Card className="bg-white  rounded-xl shadow-lg overflow-hidden border-none">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200 font-medium px-3 py-1">
                {testimonial.service}
              </Badge>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Quote size={28} className="text-purple-200" />
              </motion.div>
            </div>
            
            <div className="min-h-24 md:min-h-32">
              <p className="text-gray-700 text-sm md:text-base line-clamp-4 md:line-clamp-3">
                {testimonial.content}
              </p>
            </div>
            
            <div className="mt-6 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Avatar className="h-12 w-12 border-2 border-purple-100">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-800">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-500">{formatDate(testimonial.date)}</p>
                  <RatingStars rating={testimonial.rating} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Carousel Navigation Button Component
const CarouselButton = ({ direction, onClick, disabled }) => {
  const Icon = direction === "next" ? ChevronRight : ChevronLeft;
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${direction === "next" ? "right-2 md:right-4" : "left-2 md:left-4"} 
                 z-20 bg-white shadow-lg rounded-full p-2 md:p-3 text-purple-800 opacity-80 hover:opacity-100
                 disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <Icon size={24} />
    </motion.button>
  );
};

// Carousel Progress Indicator Component
const CarouselProgress = ({ current, total, goToSlide }) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {[...Array(total)].map((_, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goToSlide(i)}
          className={`h-2 rounded-full transition-all ${
            i === current ? "w-6 bg-purple-600" : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Main Carousel Component
export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const autoplayRef = useRef(null);
  const carouselRef = useRef(null);
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Autoplay functionality
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex]);
  
  // Reset autoplay when user interacts
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
  };

  // Navigation functions
  const handlePrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? testimonials.length - visibleCount : prev - 1
    );
    resetAutoplay();
  };

  const handleNext = () => {
    setCurrentIndex(prev => 
      prev === testimonials.length - visibleCount ? 0 : prev + 1
    );
    resetAutoplay();
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoplay();
  };
  
  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      handleNext();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrev();
    }
  };

  // Generate visible testimonials
  const getVisibleTestimonials = () => {
    const visibleItems = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleItems.push({
        ...testimonials[index],
        isActive: i === Math.floor(visibleCount / 2)
      });
    }
    
    return visibleItems;
  };

  return (
    <div className="relative px-4 py-12 max-w-6xl mx-auto ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-800 to-indigo-600 text-transparent bg-clip-text">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-gray-600 max-w-lg mx-auto">
          Real stories from satisfied customers who've experienced our quality service
        </p>
      </motion.div>
      
      <div 
        ref={carouselRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-center space-x-6 py-8 px-4 md:px-0">
          <AnimatePresence mode="wait">
            {visibleCount === 1 ? (
              <TestimonialCard 
                key={`testimonial-${currentIndex}`}
                testimonial={testimonials[currentIndex]}
                isActive={true}
              />
            ) : (
              getVisibleTestimonials().map((testimonial, index) => (
                <TestimonialCard 
                  key={`testimonial-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  isActive={index === Math.floor(visibleCount / 2)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
        
        <CarouselButton 
          direction="prev" 
          onClick={handlePrev} 
          disabled={false}
        />
        <CarouselButton 
          direction="next" 
          onClick={handleNext} 
          disabled={false}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-10 left-0 right-0"
        >
          <CarouselProgress 
            current={currentIndex}
            total={testimonials.length - (visibleCount - 1)}
            goToSlide={goToSlide}
          />
        </motion.div>
      </div>
      
    </div>
  );
}