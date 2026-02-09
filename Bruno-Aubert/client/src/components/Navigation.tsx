import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <nav className="fixed top-0 right-0 z-50 p-6 md:p-10 flex gap-8 items-center">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="relative group cursor-pointer">
          <span
            className={cn(
              "text-lg font-medium transition-colors duration-200",
              location === link.href ? "text-primary" : "text-white/80 hover:text-white"
            )}
          >
            {link.label}
          </span>
          {location === link.href && (
            <motion.div
              layoutId="underline"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
      ))}
      <a 
        href="mailto:bruno.aubert.br@gmail.com" 
        className="text-lg font-medium text-white/80 hover:text-white transition-colors duration-200 relative group"
      >
        Contact Me
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </a>
    </nav>
  );
}
