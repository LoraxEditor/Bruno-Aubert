import { motion } from "framer-motion";

// Using the background image provided in implementation_notes
const BACKGROUND_IMAGE = "/images/background_page_1_1770678920846.jpeg";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      >
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content Removed as requested */}
    </div>
  );
}
