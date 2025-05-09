import { motion } from "framer-motion"

export default function Hero(){
    return(
         
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 0.3,
              duration: 0.8,
              type: "spring"
            }
          }}
        >
          Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Services</span> For You
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { 
              delay: 0.5,
              duration: 0.8
            }
          }}
        >
          Experience the best-in-class service with our dedicated team of professionals. We deliver excellence in every project.
        </motion.p>
        <motion.button 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.7,
              duration: 0.5
            }
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0px 0px 20px rgba(124, 58, 237, 0.5)"
          }}
        >
          Get Started
        </motion.button>
      </div>
    )
}