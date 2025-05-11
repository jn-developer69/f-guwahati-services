import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

// Mock data for service listings
const serviceListings = [
  {
    id: 1,
    name: "Urban Expert Service",
    rating: 3.7,
    reviewCount: 50,
    address: "New Link Road Borivali West, Mumbai",
    services: ["AC Repair & Services", "Refrigerator Repair & Services"],
    phone: "09845458106",
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    trusted: false,
    verified: false,
    topSearch: false
  },
  {
    id: 2,
    name: "Parmar Airtronics",
    rating: 5.0,
    reviewCount: 1253,
    address: "Vidya Mandir Road Dahisar East, Mumbai",
    services: ["AC Dealers", "AC Repair & Services"],
    phone: "09845475198",
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    trusted: true,
    verified: true,
    topSearch: true
  },
  {
    id: 3,
    name: "Cool Comfort Solutions",
    rating: 4.5,
    reviewCount: 832,
    address: "MG Road Kandivali West, Mumbai",
    services: ["AC Installation", "AC Repair & Services", "Annual Maintenance"],
    phone: "09876543210",
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    trusted: true,
    verified: true,
    topSearch: false
  }
];

export default function ServiceListingUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState(serviceListings);

  // Handle search functionality
  useEffect(() => {
    const results = serviceListings.filter(listing =>
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredListings(results);
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Service Listings */}
      <div className="space-y-6 mt-6">
        {filteredListings.map(listing => (
          <ServiceCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search services, locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black focus:border-transparent"
        />
        <Search className="absolute left-3 text-gray-400" size={18} />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
}

