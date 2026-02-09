import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  embedHtml: string;
  className?: string;
}

export function VideoPlayer({ embedHtml, className }: VideoPlayerProps) {
  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black/50 aspect-video shadow-2xl ring-1 ring-white/10",
        className
      )}
    >
      <div 
        className="absolute inset-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
        dangerouslySetInnerHTML={{ __html: embedHtml }} 
      />
    </div>
  );
}
