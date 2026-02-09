import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { VideoPlayer } from "@/components/VideoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Users, Link as LinkIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Set first project as selected by default when data loads
  if (projects && projects.length > 0 && selectedId === null) {
    setSelectedId(projects[0].id);
  }

  const selectedProject = projects?.find((p) => p.id === selectedId);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Selected Projects</h1>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[700px]">
          {/* List Section (Left on Mobile, Left Column on Desktop) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {projects?.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group",
                  selectedId === project.id
                    ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
                    : "bg-card/50 border-white/5 hover:border-white/20 hover:bg-card"
                )}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={project.iconUrl}
                      alt={project.channelName}
                      className="w-12 h-12 rounded-full border border-white/10 bg-black/50 object-cover"
                    />
                    <div>
                      <h3 className={cn(
                        "text-lg font-bold transition-colors",
                        selectedId === project.id ? "text-primary" : "text-white"
                      )}>
                        {project.channelName}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.subscriberCount}
                      </p>
                    </div>
                  </div>
                  {selectedId === project.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </div>
                
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Detail Section (Right Column) */}
          <div className="w-full lg:w-2/3 relative">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col gap-6"
                >
                  <div className="flex flex-col-reverse lg:flex-row gap-8 h-full">
                    
                    {/* Description LEFT (on Desktop view inside the detail pane) */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6 justify-center">
                      <div className="space-y-4">
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-3xl font-display font-bold"
                        >
                          {selectedProject.channelName}
                        </motion.h2>
                        
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-muted-foreground leading-relaxed"
                        >
                          {selectedProject.description}
                        </motion.p>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col gap-3"
                      >
                        <a
                          href={selectedProject.channelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Visit Channel
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Play className="w-4 h-4" />
                          <span>Latest Video Preview</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Video RIGHT */}
                    <div className="w-full lg:w-2/3">
                      <VideoPlayer 
                        embedHtml={selectedProject.videoEmbedHtml} 
                        className="h-full min-h-[300px] lg:min-h-full rounded-2xl shadow-2xl shadow-black/50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
