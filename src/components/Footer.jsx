import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram,
  ChevronRight
} from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';

// Assimox Logo Component
const AssimoxLogo = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center gap-3"
  >
    <svg width="50" height="50" viewBox="0 0 100 100" className="text-purple-400">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M10,50 L50,10 L90,50 L50,90 Z"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        d="M30,50 L50,30 L70,50"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
      />
    </svg>
    <div>
      <h1 className="text-2xl font-bold text-white">Assimox</h1>
      <p className="text-xs text-gray-300">APPLIANCES REPAIRS</p>
    </div>
  </motion.div>
);



// Service Item Component
const ServiceItem = ({ title, isActive }) => (
  <motion.li 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`py-2 cursor-pointer ${isActive ? 'text-purple-400' : 'text-gray-300'}`}
  >
    {title}
  </motion.li>
);

// Service Area Item Component
const ServiceAreaItem = ({ city, isHighlighted }) => (
  <motion.li 
    whileHover={{ scale: 1.05, x: 5 }}
    whileTap={{ scale: 0.95 }}
    className={`py-2 cursor-pointer `}
  >
    {city}
  </motion.li>
);

// Footer Link Component
const FooterLink = ({ icon, href }) => (
  <motion.a 
    href={href} 
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
  >
    {icon}
  </motion.a>
);

// Recent Post Component
const RecentPost = ({ title, date }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700"
  >
    <div>
      <h4 className="text-sm font-medium text-white">{title}</h4>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
    <ChevronRight size={16} className="text-purple-400" />
  </motion.div>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };
  
  // Apply the theme gradient to body
  useEffect(() => {
    document.body.classList.add('from-indigo-900', 'to-purple-900', 'text-white');
    
    // Create the animation styles
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      body.theme-animated {
        background: linear-gradient(135deg, #312e81, #6b21a8);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className=" bg-gray-900 text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-800 py-4"
      >
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={18} className="text-purple-400" />
            <p>54B, Tailstoi Town 5238 MT, La city, IA 522364</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Mail size={18} className="text-purple-400" />
              <p>Email us: contact@assimox.com</p>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Phone size={18} className="text-purple-400" />
              <p>Call us on: +1800 456 7890</p>
            </div>
            
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </motion.header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo and Tagline */}
          <div className="md:col-span-3">
            <AssimoxLogo />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-4 text-sm text-gray-300"
            >
              Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.
            </motion.p>
          </div>
          
          {/* Service Areas */}
          <div className="md:col-span-3">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold mb-4"
            >
              Services Area
            </motion.h3>
            <ul>
              <ServiceAreaItem city="Guwahati" />
              <ServiceAreaItem city="Malegaon" />
              <ServiceAreaItem city="Chandipur" isHighlighted={true} />
              <ServiceAreaItem city="Dinhata" isHighlighted={true} />
              <ServiceAreaItem city="Kolkata" />
            </ul>
          </div>
          
          {/* Our Services */}
          <div className="md:col-span-3">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold mb-4"
            >
              Our Services
            </motion.h3>
            <ul>
              <ServiceItem title="Refrigerator" />
              <ServiceItem title="Microwave" />
              <ServiceItem title="Washing Machine" />
              <ServiceItem title="Cookware Stove" />
              <ServiceItem title="Juicer Mixer" />
            </ul>
          </div>
          
          {/* Recent Posts (replacing Newsletter) */}
          <div className="md:col-span-3">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold mb-4"
            >
              Recent Posts
            </motion.h3>
            
            <RecentPost 
              title="Common Refrigerator Problems & Solutions" 
              date="May 8, 2025" 
            />
            
            <RecentPost 
              title="Extend the Life of Your Washing Machine" 
              date="May 5, 2025" 
            />
            
            <RecentPost 
              title="Kitchen Appliance Maintenance Tips" 
              date="April 30, 2025" 
            />
            
            <div className="flex gap-2 mt-6">
              <FooterLink icon={<Facebook size={16} />} href="#" />
              <FooterLink icon={<Linkedin size={16} />} href="#" />
              <FooterLink icon={<Twitter size={16} />} href="#" />
              <FooterLink icon={<Instagram size={16} />} href="#" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="border-t border-gray-800 py-6"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© Copyright Assimox WordPress 2024. All right reserved.</p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0 hover:text-gray-50"><a href="https://zariveth.com/" target="_blanck"> Created by Zarivet</a>h</p>
        </div>
      </motion.footer>
     
    </div>
  );
}