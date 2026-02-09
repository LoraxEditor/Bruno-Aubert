import { FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingDiscord() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://discord.com/users/1424077352438333495"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#5865F2] text-white shadow-lg hover:shadow-[#5865F2]/50 hover:scale-110 transition-all duration-300"
          >
            <FaDiscord className="w-7 h-7" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Join us on Discord</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}
