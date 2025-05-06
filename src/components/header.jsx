import { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Home, 
  Settings, 
  Info, 
  Image,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Calendar,
  Star,
  CreditCard,
  Clock,
  Shield,
  
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnhancedApplianceRepairHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollTop = useRef(0);
  
  // Track scroll direction for hiding/showing header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollPosition(currentScrollPos);
      
      // Show/hide header based on scroll direction
      if (currentScrollPos > 100) {
        setIsHeaderVisible(lastScrollTop.current > currentScrollPos || currentScrollPos < 10);
      } else {
        setIsHeaderVisible(true);
      }
      
      lastScrollTop.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen || isMobileMenuOpen) {
        // Close menus if click is outside
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    
    // Add with capture phase to ensure it runs before other handlers
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isMobileMenuOpen]);

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // List of navigation items for reusability
  const navItems = [
    { name: 'Home', icon: <Home size={18} />, href: '#home', id: 'home' },
    { name: 'Services', icon: <Settings size={18} />, href: '#services', id: 'services' },
    { name: 'About', icon: <Info size={18} />, href: '#about', id: 'about' },
    { name: 'Gallery', icon: <Image size={18} />, href: '#gallery', id: 'gallery' },
    { name: 'Booking', icon: <Calendar size={18} />, href: '#booking', id: 'booking' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const navbarBgClass = scrollPosition > 10 
    ? 'bg-white/95 backdrop-blur-md shadow-lg' 
    : 'bg-transparent';

  // Dynamic header positioning based on scroll
  const navbarPositionClass = scrollPosition > 60
    ? `sticky ${isHeaderVisible ? 'top-0' : '-top-32'} z-50 transition-all duration-500 transform`
    : 'relative z-20';

  return (
    <div className="w-full font-sans overflow-hidden">
      {/* Enhanced decorative background with improved gradient effect */}
      <div className="absolute inset-0 z-0 h-72 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 opacity-90">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-indigo-500/30 to-blue-800/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Improved animated floating shapes */}
          <motion.div 
            className="absolute top-10 left-1/4 w-40 h-40 rounded-full bg-cyan-300/20 blur-3xl"
            animate={{ 
              x: [0, 15, 0], 
              y: [0, -20, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 12,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-32 right-1/3 w-56 h-56 rounded-full bg-indigo-600/20 blur-3xl"
            animate={{ 
              x: [0, -25, 0], 
              y: [0, 15, 0],
              scale: [1, 1.3, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 18,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl"
            animate={{ 
              x: [0, 20, 0], 
              y: [0, -10, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>
      </div>

      {/* Top contact bar with enhanced animations and trust indicators */}
      <motion.div 
        className="relative w-full pt-3 pb-4 px-4 md:px-8 text-white z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          <motion.div className="flex flex-wrap gap-3 md:gap-6 text-sm md:text-base" variants={containerVariants}>
            <motion.a 
              href="https://wa.me/1234567890" 
              className="flex items-center gap-2 hover:text-cyan-300 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-white/30 p-1.5 rounded-full backdrop-blur-sm">
                <MessageSquare size={16} className="text-white" />
              </div>
              <span className="hidden sm:inline font-medium">WhatsApp</span>
            </motion.a>
            
            <motion.a 
              href="mailto:service@appliancerepair.com" 
              className="flex items-center gap-2 hover:text-cyan-300 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-white/30 p-1.5 rounded-full backdrop-blur-sm">
                <Mail size={16} className="text-white" />
              </div>
              <span className="hidden sm:inline font-medium">service@appliancerepair.com</span>
            </motion.a>
            
            <motion.a 
              href="tel:+1234567890" 
              className="flex items-center gap-2 hover:text-cyan-300 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-white/30 p-1.5 rounded-full backdrop-blur-sm">
                <Phone size={16} className="text-white" />
              </div>
              <span className="hidden sm:inline font-medium">123-456-7890</span>
            </motion.a>
          </motion.div>
          
          {/* Trust badges */}
          <motion.div 
            className="hidden md:flex items-center gap-4"
            variants={containerVariants}
          >
            <motion.span 
              className="flex items-center gap-1.5 text-sm font-medium bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.2 }
              }}
              variants={itemVariants}
            >
              <Clock size={14} />
              24/7 Emergency Service
            </motion.span>
            
            <motion.span 
              className="flex items-center gap-1.5 text-sm font-medium bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.2 }
              }}
              variants={itemVariants}
            >
              <Shield size={14} />
              Licensed & Insured
            </motion.span>
            
            <motion.span 
              className="flex items-center gap-1.5 text-sm font-medium bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.2 }
              }}
              variants={itemVariants}
            >
              <Award size={14} />
              5-Star Rated
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navigation with enhanced card design that overlaps the top bar */}
      <motion.header 
        className={`${navbarPositionClass} ${navbarBgClass} transition-all duration-500 pb-1`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Enhanced logo section with animated gear icon */}
            <motion.div 
              className="flex-shrink-0 flex items-center py-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-sm">
                <motion.span 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <Settings className="text-blue-500" />
                    <motion.div 
                      className="absolute -inset-1 rounded-full bg-blue-500/20 blur-sm z-0"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                  FixItPro
                </motion.span>
              </div>
            </motion.div>

            {/* Desktop Navigation - Enhanced with glass effect and animations */}
            <nav className="hidden md:flex items-center">
              <motion.div 
                className="flex items-center gap-1 md:gap-2 lg:gap-6 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 shadow-lg"
                variants={containerVariants}
              >
                {navItems.map((item) => (
                  <motion.a 
                    key={item.id}
                    href={item.href} 
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' 
                        : scrollPosition > 10 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:bg-white/20'
                    }`}
                    onClick={() => setActiveSection(item.id)}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-current">{item.icon}</span>
                    <span>{item.name}</span>
                    {activeSection === item.id && (
                      <motion.span 
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                        layoutId="navIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                ))}
                
                {/* Call to action button with enhanced animation */}
                <motion.a
                  href="#quote"
                  className="ml-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20"
                    animate={{ 
                      x: ["-100%", "100%"],
                      opacity: [0.5, 0.8, 0.5] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut" 
                    }}
                  />
                  <CreditCard size={16} />
                  <span className="relative z-10">Get Free Quote</span>
                </motion.a>
                
                {/* Profile Menu - Enhanced with smooth transitions */}
                <div className="relative ml-4">
                  <motion.button
                    onClick={toggleProfileMenu}
                    className={`flex items-center gap-2 transition-all duration-300 ml-2 pl-2 border-l ${
                      scrollPosition > 10 ? 'border-gray-200 text-gray-700' : 'border-white/20 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white overflow-hidden ring-2 ring-white">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <motion.div
                      animate={isProfileOpen ? { rotate: 180 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden bg-white/95 backdrop-blur-lg shadow-xl ring-1 ring-black/5 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-1">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
                          </div>
                          <div className="py-1">
                            <motion.a 
                              href="#" 
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg m-1"
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <LayoutDashboard size={16} />
                              Dashboard
                            </motion.a>
                            <motion.a 
                              href="#" 
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg m-1"
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Star size={16} />
                              My Bookings
                            </motion.a>
                            <motion.a 
                              href="#" 
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg m-1"
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <LogOut size={16} />
                              Logout
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </nav>
            
            {/* Mobile menu button - Enhanced with smoother animations */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className={`inline-flex items-center justify-center p-2 rounded-full ${
                  scrollPosition > 10 
                    ? 'text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600' 
                    : 'text-white bg-white/30 hover:bg-white/40'
                } focus:outline-none backdrop-blur-sm`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced mobile menu with improved animations and interaction */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-gradient-to-b from-white to-gray-50"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div 
                className="px-3 pt-3 pb-4 space-y-1 sm:px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="p-2 mb-2 flex justify-center">
                  <motion.a
                    href="#quote"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md relative overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-white/20"
                      animate={{ 
                        x: ["-100%", "100%"]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut" 
                      }}
                    />
                    <CreditCard size={16} />
                    <span className="relative z-10">Get Free Quote</span>
                  </motion.a>
                </div>
                
                {/* Trust badges for mobile */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-2"
                  variants={itemVariants}
                >
                  <span className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">
                    <Clock size={12} />
                    24/7 Service
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">
                    <Shield size={12} />
                    Licensed
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">
                    <Award size={12} />
                    5-Star Rated
                  </span>
                </motion.div>
                
                {navItems.map((item) => (
                  <motion.a 
                    key={item.id}
                    href={item.href} 
                    className={`flex items-center gap-3 ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-l-4 border-transparent'
                    } px-4 py-3 rounded-xl text-base font-medium`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={activeSection === item.id ? 'text-blue-600' : 'text-gray-500'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </motion.a>
                ))}
                
                <div className="border-t border-gray-200 my-2"></div>

                <motion.div
                  className="rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-3 mt-3"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white overflow-hidden">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@example.com</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <motion.a 
                      href="#" 
                      className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 shadow-sm"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white px-4 py-2 rounded-lg text-sm text-red-600 shadow-sm"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </motion.a>
                  </div>
                </motion.div>
                
                {/* Enhanced emergency contact in mobile menu */}
                <motion.div
                  className="mt-4 p-3 bg-gradient-to-r from-cyan-100 to-blue-50 rounded-xl relative overflow-hidden"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-200 opacity-50 blur-xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4
                    }}
                  />
                  <p className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-blue-600" />
                    24/7 Emergency Service
                  </p>
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                  >
                    <Phone size={16} />
                    <span>Call Now: 123-456-7890</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}