import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, User, ChevronDown, FileText, X, AlignRight, Instagram, Facebook, Twitter, Linkedin, Heart, Clock, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PremiumServicesHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [menuHoverIndex, setMenuHoverIndex] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const contactItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 200 }
    })
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.7, 
        type: "spring", 
        stiffness: 100 
      } 
    },
    hover: { 
      scale: 1.05, 
      rotate: [0, -3, 3, -2, 2, 0], 
      transition: { duration: 0.6 } 
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.3 + (i * 0.1), 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100 
      } 
    }),
    hover: { 
      scale: 1.1, 
      color: "#6d28d9", 
      transition: { duration: 0.2 } 
    }
  };

  const navMenuItems = [
    { name: "Home", icon: Heart },
    { name: "Services", icon: Clock },
    { name: "About Us", icon: User },
    { name: "Gallery", icon: Instagram }
  ];

  return (
    <div className="w-full font-sans">
      {/* Top Contact Bar - Enhanced & More Attractive */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between">
          {/* Left Section - Social Media */}
          <motion.div 
            className="flex items-center space-x-4 justify-center lg:justify-start py-1 px-4 border-b lg:border-b-0 lg:border-r border-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
          >
            <motion.a 
              href="#facebook" 
              className="hover:text-purple-300 transition-colors p-2"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Facebook size={16} />
            </motion.a>
            <motion.a 
              href="#instagram" 
              className="hover:text-purple-300 transition-colors p-2"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Instagram size={16} />
            </motion.a>
            <motion.a 
              href="#twitter" 
              className="hover:text-purple-300 transition-colors p-2"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Twitter size={16} />
            </motion.a>
            <motion.a 
              href="#linkedin" 
              className="hover:text-purple-300 transition-colors p-2"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Linkedin size={16} />
            </motion.a>
          </motion.div>
          
          {/* Center Section - Contact Details */}
          <div className="flex flex-wrap justify-center lg:justify-between items-center py-2 px-4 flex-grow">
            {/* Contact buttons for mobile/tablet screens */}
            <div className="flex w-full justify-between md:hidden">
              <motion.a
                href="tel:+15551234567"
                className="flex items-center bg-purple-700 text-white px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={16} className="mr-2" />
                <span>Call Now</span>
              </motion.a>
              
              <motion.a
                href="https://wa.me/15559876543"
                className="flex items-center bg-purple-700 text-white px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={16} className="mr-2" />
                <span>WhatsApp</span>
              </motion.a>
            </div>
            
            {/* Regular contact info - hidden on smallest screens, visible on md+ */}
            <div className="hidden md:flex flex-wrap justify-center lg:justify-between items-center w-full">
              <motion.div 
                className="flex items-center mx-4 my-1 group"
                variants={contactItemVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-purple-700 rounded-full p-2 mr-3 group-hover:bg-indigo-600 transition-all">
                  <Phone size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-purple-200">Call Us Now</span>
                  <span className="text-sm font-medium">+1 (555) 123-4567</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center mx-4 my-1 group"
                variants={contactItemVariants}
                initial="hidden"
                animate="visible"
                custom={1}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-purple-700 rounded-full p-2 mr-3 group-hover:bg-indigo-600 transition-all">
                  <Mail size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-purple-200">Email Support</span>
                  <span className="text-sm font-medium">contact@bestservices.com</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center mx-4 my-1 group"
                variants={contactItemVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-purple-700 rounded-full p-2 mr-3 group-hover:bg-indigo-600 transition-all">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-purple-200">WhatsApp</span>
                  <span className="text-sm font-medium">+1 (555) 987-6543</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center mx-4 my-1 group hidden lg:flex"
                variants={contactItemVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-purple-700 rounded-full p-2 mr-3 group-hover:bg-indigo-600 transition-all">
                  <MapPin size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-purple-200">Our Location</span>
                  <span className="text-sm font-medium">123 Service Ave, Business District</span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Right Section - CTA Button */}
          <motion.div 
            className="hidden lg:flex items-center justify-center border-l border-purple-700 px-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.6 } }}
          >
            <motion.button 
              className="bg-white text-purple-900 hover:bg-purple-100 font-bold py-1 px-4 rounded-full text-sm"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Solutions
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Main Navigation Bar - Enhanced for desktop */}
      <motion.div 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-2 bg-white shadow-lg' 
            : 'py-4 bg-white shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo with enhanced animation */}
            <motion.div 
              className="flex items-center"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center transform rotate-12 mr-3">
                  <span className="text-white font-bold text-2xl transform -rotate-12">B</span>
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full" 
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
              <div>
                <h1 className="font-bold text-2xl text-gray-800">Best<span className="text-purple-700">Services</span></h1>
                <p className="text-xs text-gray-500">Excellence in Every Detail</p>
              </div>
            </motion.div>
            
            {/* Desktop Navigation - Enhanced with icons and animations */}
            <div className="hidden lg:flex items-center space-x-6">
              {navMenuItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    className="relative"
                    onHoverStart={() => setMenuHoverIndex(i)}
                    onHoverEnd={() => setMenuHoverIndex(null)}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    custom={i}
                  >
                    <motion.a 
                      href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-700 font-medium hover:text-purple-700 flex flex-col items-center"
                      whileHover="hover"
                    >
                      <Icon size={18} className="mb-1" />
                      <span>{item.name}</span>
                    </motion.a>
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full"
                      initial={{ width: 0, left: "50%" }}
                      animate={{ 
                        width: menuHoverIndex === i ? "100%" : 0,
                        left: menuHoverIndex === i ? 0 : "50%"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
              
              {/* Changed to Blog from Search */}
              <motion.div
                className="relative group"
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                custom={4}
              >
                <motion.button
                  className="flex flex-col items-center text-gray-700 hover:text-purple-700"
                  whileHover={{ scale: 1.1 }}
                >
                  <FileText size={18} className="mb-1" />
                  <span className="text-sm">Videos</span>
                </motion.button>
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full"
                  initial={{ width: 0, left: "50%" }}
                  animate={{ width: 0, left: "50%" }}
                  whileHover={{ width: "100%", left: 0 }}
                />
              </motion.div>
              
              {/* Login Button with enhanced dropdown */}
              <div className="relative">
                <motion.button
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0px 0px 15px rgba(124, 58, 237, 0.5)"
                  }}
                  custom={5}
                >
                  <User size={18} />
                  <span>Login / Sign Up</span>
                  <motion.div
                    animate={{ rotate: loginDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {loginDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl py-2 z-10 border border-gray-100"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { 
                          duration: 0.3,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        } 
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -10, 
                        scale: 0.95,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">User Account</p>
                        <p className="text-xs text-gray-500">Manage your account settings</p>
                      </div>
                      <a href="#login" className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors">
                        <User size={16} className="mr-3 text-purple-600" />
                        <span>Sign In</span>
                      </a>
                      <a href="#register" className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors">
                        <User size={16} className="mr-3 text-purple-600" />
                        <span>Create Account</span>
                      </a>
                      <a href="#forgot" className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors">
                        <Mail size={16} className="mr-3 text-purple-600" />
                        <span>Forgot Password</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <motion.button 
              className="lg:hidden text-gray-700 bg-gray-100 p-2 rounded-md"
              onClick={() => setMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AlignRight size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile menu - Enhanced with better animations and updated Blog menu item */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 lg:hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl py-4 px-6 overflow-auto"
              initial={{ x: "100%" }}
              animate={{ 
                x: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }
              }}
              exit={{ 
                x: "100%",
                transition: { duration: 0.3 }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gradient-to-br from-purple-700 to-indigo-500 rounded-lg flex items-center justify-center mr-2 transform rotate-12">
                    <span className="text-white font-bold text-lg transform -rotate-12">B</span>
                  </div>
                  <h2 className="font-bold text-lg text-gray-800">Best<span className="text-purple-700">Services</span></h2>
                </div>
                <motion.button 
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="text-gray-700" />
                </motion.button>
              </div>
              
              <div className="space-y-1">
                {navMenuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a 
                      key={item.name} 
                      href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: 1, 
                        transition: { 
                          delay: 0.1 * i, 
                          duration: 0.3 
                        } 
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <Icon size={18} className="mr-3" />
                      {item.name}
                    </motion.a>
                  );
                })}
                
                {/* Blog menu item added to mobile menu */}
                <motion.a 
                  href="#blog"
                  className="flex items-center py-3 px-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1, 
                    transition: { 
                      delay: 0.4, 
                      duration: 0.3 
                    } 
                  }}
                  whileHover={{ x: 5 }}
                >
                  <FileText size={18} className="mr-3" />
                  Blog
                </motion.a>
                
                <motion.div
                  className="pt-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1, 
                    transition: { 
                      delay: 0.5, 
                      duration: 0.3 
                    } 
                  }}
                >
                  <a href="#login" className="block py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-medium">
                    Login / Register
                  </a>
                </motion.div>
                
                {/* Mobile Contact Buttons */}
                <motion.div
                  className="flex justify-between mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { 
                      delay: 0.5, 
                      duration: 0.3 
                    }
                  }}
                >
                  <motion.a
                    href="tel:+15551234567"
                    className="flex items-center bg-purple-700 text-white px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone size={16} className="mr-2" />
                    <span>Call Now</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/15559876543"
                    className="flex items-center bg-purple-700 text-white px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={16} className="mr-2" />
                    <span>WhatsApp</span>
                  </motion.a>
                </motion.div>
                
                <motion.div
                  className="pt-6 mt-4 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { 
                      delay: 0.6, 
                      duration: 0.3 
                    }
                  }}
                >
                  <p className="text-xs font-medium text-gray-500 mb-3">CONTACT US</p>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={14} className="mr-3 text-purple-600" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageCircle size={14} className="mr-3 text-purple-600" />
                      <span>+1 (555) 987-6543</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={14} className="mr-3 text-purple-600" />
                      <span>contact@bestservices.com</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-3 text-purple-600" />
                      <span>123 Service Ave, Business District</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4 mt-6">
                    <motion.a 
                      href="#facebook" 
                      className="text-purple-600 hover:text-purple-800"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Facebook size={20} />
                    </motion.a>
                    <motion.a 
                      href="#instagram" 
                      className="text-purple-600 hover:text-purple-800"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Instagram size={20} />
                    </motion.a>
                    <motion.a 
                      href="#twitter" 
                      className="text-purple-600 hover:text-purple-800"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Twitter size={20} />
                    </motion.a>
                    <motion.a 
                      href="#linkedin" 
                      className="text-purple-600 hover:text-purple-800"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Linkedin size={20} />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
   
    </div>
  );
}