import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Wind, 
  Waves, 
  BookOpen, 
  WashingMachine, 
  Home, 
  Building, 
  Utensils, 
  Scissors, 
  Flower2, 
  Sparkles, 
  Car, 
  Bike, 
  Film, 
  ShoppingCart, 
  Zap
} from "lucide-react";

import { 
  Card,
  CardContent
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Custom scrollable service container
const ServiceSection = ({ title, services, icon }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      
      <div className="relative">
        {canScrollLeft && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg"
            onClick={() => scroll('left')}
          >
            <ArrowLeft size={20} />
          </motion.button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          onScroll={checkScrollButtons}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
        
        {canScrollRight && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg"
            onClick={() => scroll('right')}
          >
            <ArrowRight size={20} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ title, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="flex-shrink-0 w-64"
    >
      <Card className="overflow-hidden h-full bg-gradient-to-br from-white to-gray-50 border-0 shadow-md">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40 flex items-center justify-center relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-black/0"
              whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            />
            <div className="text-white transform scale-150 opacity-75">
              {icon}
            </div>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-center">{title}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main App Component
export default function ServicesUI() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Define all services data
  const allServices = {
    ac: [
      { title: "Banquet Halls", icon: <Building size={48} /> },
      { title: "Bridal Requisite", icon: <Sparkles size={48} /> },
      { title: "Caterers", icon: <Utensils size={48} /> },
      { title: "Home Service", icon: <Home size={48} /> },
      { title: "Office Service", icon: <Building size={48} /> }
    ],
    washing: [
      { title: "Beauty Parlours", icon: <Sparkles size={48} /> },
      { title: "Spa & Massages", icon: <Flower2 size={48} /> },
      { title: "Salons", icon: <Scissors size={48} /> },
      { title: "Home Service", icon: <Home size={48} /> },
      { title: "Commercial", icon: <Building size={48} /> }
    ],
    woven: [
      { title: "AC Service", icon: <Wind size={48} /> },
      { title: "Car Service", icon: <Car size={48} /> },
      { title: "Bike Service", icon: <Bike size={48} /> },
      { title: "Home Service", icon: <Home size={48} /> },
      { title: "Commercial", icon: <Building size={48} /> }
    ],
    refrigerator: [
      { title: "Movies", icon: <Film size={48} /> },
      { title: "Grocery", icon: <ShoppingCart size={48} /> },
      { title: "Electricians", icon: <Zap size={48} /> },
      { title: "Home Service", icon: <Home size={48} /> },
      { title: "Commercial", icon: <Building size={48} /> }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Professional Services
      </motion.h1>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r from-blue-500 to-purple-600 data-[state=active]:text-white">
              All Services
            </TabsTrigger>
            <TabsTrigger value="ac" className="data-[state=active]:bg-gradient-to-r from-blue-500 to-purple-600 data-[state=active]:text-white">
              AC
            </TabsTrigger>
            <TabsTrigger value="washing" className="data-[state=active]:bg-gradient-to-r from-blue-500 to-purple-600 data-[state=active]:text-white">
              Washing
            </TabsTrigger>
            <TabsTrigger value="woven" className="data-[state=active]:bg-gradient-to-r from-blue-500 to-purple-600 data-[state=active]:text-white">
              Woven
            </TabsTrigger>
            <TabsTrigger value="refrigerator" className="data-[state=active]:bg-gradient-to-r from-blue-500 to-purple-600 data-[state=active]:text-white">
              Refrigerator
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <ServiceSection 
            title="AC Services" 
            services={allServices.ac}
            icon={<Wind className="text-blue-600" size={24} />}
          />
          <ServiceSection 
            title="Washing Machine Services" 
            services={allServices.washing}
            icon={<WashingMachine className="text-purple-600" size={24} />}
          />
          <ServiceSection 
            title="Woven Services" 
            services={allServices.woven}
            icon={<Waves className="text-blue-600" size={24} />}
          />
          <ServiceSection 
            title="Refrigerator Services" 
            services={allServices.refrigerator}
            icon={<BookOpen className="text-purple-600" size={24} />}
          />
        </TabsContent>

        <TabsContent value="ac" className="mt-0">
          <ServiceSection 
            title="AC Services" 
            services={allServices.ac}
            icon={<Wind className="text-blue-600" size={24} />}
          />
        </TabsContent>

        <TabsContent value="washing" className="mt-0">
          <ServiceSection 
            title="Washing Machine Services" 
            services={allServices.washing}
            icon={<WashingMachine className="text-purple-600" size={24} />}
          />
        </TabsContent>

        <TabsContent value="woven" className="mt-0">
          <ServiceSection 
            title="Woven Services" 
            services={allServices.woven}
            icon={<Waves className="text-blue-600" size={24} />}
          />
        </TabsContent>

        <TabsContent value="refrigerator" className="mt-0">
          <ServiceSection 
            title="Refrigerator Services" 
            services={allServices.refrigerator}
            icon={<BookOpen className="text-purple-600" size={24} />}
          />
        </TabsContent>
      </Tabs>

      {/* Floating Action Button with cool animation */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1.2
        }}
      >
        <motion.button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)" }}
          whileTap={{ scale: 0.9 }}
        >
          <Home size={24} />
        </motion.button>
      </motion.div>

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