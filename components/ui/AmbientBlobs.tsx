import { cn } from "@/lib/utils";

interface Blob {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: string;
  opacity?: number;
}

export default function AmbientBlobs({
  blobs,
  className,
}: {
  blobs: Blob[];
  className?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute animate-blob animate-float-slow blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            opacity: blob.opacity ?? 0.35,
            animationDelay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}
