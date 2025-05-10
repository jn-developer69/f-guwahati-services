import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronLeft, ChevronRight, Instagram, Twitter, Mail } from 'lucide-react';

// Gallery data with images and metadata
const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1746648177616-eed4cc1a1213?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Abstract Sculpture Study",
    artist: "Elena Moraitis",
    date: "2023",
    category: "Contemporary"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1746796624796-7f0fd61570a1?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Winter Retreat",
    artist: "A. John Valore",
    date: "1963",
    category: "Landscape"
  },
  {
    id: 3,
    image: "https://plus.unsplash.com/premium_photo-1723777236925-a07c8cee66dd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Night Watch (Detail)",
    artist: "Dutch Masters Collection",
    date: "1642",
    category: "Classical"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1746793329190-e2c6bea16388?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Color Field Study #27",
    artist: "Marcus Rothwell",
    date: "1971",
    category: "Modern"
  },
  {
    id: 5,
    image: "https://cdn.pixabay.com/photo/2025/05/02/15/58/flower-girl-9574211_1280.jpg",
    title: "Portrait in Black & White",
    artist: "Sarah Chen",
    date: "2019",
    category: "Photography"
  },
  {
    id: 6,
    image: "https://cdn.pixabay.com/photo/2020/09/27/03/38/woman-5605529_640.jpg",
    title: "Geometric Tensions",
    artist: "Paul Westheim",
    date: "1988",
    category: "Abstract"
  }
];

export default function GalleryUI() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="min-h-screen  text-white">
      {/* Header */}
      <header className="pt-10 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-center mt-4 mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Modern Gallery
          </motion.h1>
          <motion.div 
            className="flex flex-wrap gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'from-indigo-900 to-purple-900 bg-gradient-to-r'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden rounded-lg aspect-[4/3] bg-black/20 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Image */}
                <motion.div className="absolute inset-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </motion.div>
                
                {/* Overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-semibold"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex items-center gap-2 mt-1 text-sm text-gray-300"
                    >
                      <span>{item.artist}</span>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{item.date}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      
      {/* Modal for expanded view */}
      {activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
        >
          <div className="relative w-full max-w-5xl">
            {/* Close button */}
            <button 
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Navigation */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-indigo-950/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="md:flex">
                <div className="md:w-2/3 relative">
                  <img 
                    src={filteredItems[activeIndex].image} 
                    alt={filteredItems[activeIndex].title} 
                    className="w-full h-64 md:h-[500px] object-cover"
                  />
                </div>
                <div className="md:w-1/3 p-6 md:p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold">{filteredItems[activeIndex].title}</h2>
                    <p className="text-lg mt-1 text-gray-300">{filteredItems[activeIndex].artist}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="bg-indigo-800/80 px-3 py-1 rounded-full text-sm">{filteredItems[activeIndex].date}</span>
                      <span className="bg-purple-800/60 px-3 py-1 rounded-full text-sm">{filteredItems[activeIndex].category}</span>
                    </div>
                    
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <p className="text-gray-300">
                        This artwork exemplifies the {filteredItems[activeIndex].category.toLowerCase()} movement's 
                        characteristics with its {filteredItems[activeIndex].category === 'Abstract' ? 'non-representational forms' : 
                        filteredItems[activeIndex].category === 'Contemporary' ? 'bold experimentation' : 
                        filteredItems[activeIndex].category === 'Classical' ? 'masterful technique' : 
                        filteredItems[activeIndex].category === 'Photography' ? 'powerful composition' : 
                        filteredItems[activeIndex].category === 'Landscape' ? 'atmospheric quality' : 'unique style'}.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">SHARE</h4>
                      <div className="flex gap-4">
                        <button className="p-2 rounded-full bg-indigo-800/30 hover:bg-indigo-700 transition-colors">
                          <Instagram size={18} />
                        </button>
                        <button className="p-2 rounded-full bg-indigo-800/30 hover:bg-indigo-700 transition-colors">
                          <Twitter size={18} />
                        </button>
                        <button className="p-2 rounded-full bg-indigo-800/30 hover:bg-indigo-700 transition-colors">
                          <Mail size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2025 Modern Gallery. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Visit</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Exhibitions</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Collection</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}