import { useReviews } from "@/hooks/use-reviews";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Reviews() {
  const { data: reviews, isLoading } = useReviews();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Testimonials</h1>
        <p className="text-xl text-muted-foreground">
          Trusted by content creators and educational platforms to deliver high-quality video production.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews?.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl transform translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              <div className="relative bg-card border border-white/5 rounded-3xl p-8 h-full flex flex-col hover:border-white/10 transition-colors shadow-xl">
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                
                <p className="text-lg text-slate-300 mb-8 flex-grow leading-relaxed italic">
                  "{review.content}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-black/50 border border-white/10">
                    {review.avatarUrl ? (
                      <img 
                        src={review.avatarUrl} 
                        alt={review.channelName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {review.channelName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{review.channelName}</h4>
                    <span className="text-sm text-primary">Verified Client</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
