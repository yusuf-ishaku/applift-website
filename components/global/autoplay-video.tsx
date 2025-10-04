"use client";

import { useEffect, useRef, useState, type FC } from "react";
import type { StaticImageData } from "next/image";
import clsx from "clsx";
import Image from "next/image";

interface AutoplayVideoProps {
  src: string;
  poster?: StaticImageData;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export const AutoplayVideo: FC<AutoplayVideoProps> = ({
  src,
  poster,
  muted = true,
  loop = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Intersection Observer for autoplay
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.25,
        rootMargin: "100px 0px",
      },
    );

    observer.observe(containerRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (containerRef.current) observer.unobserve(containerRef.current);
      observer.disconnect();
    };
  }, []);

  // Play / pause based on visibility (with debounce)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeout: NodeJS.Timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        video.play().catch(() => {
          /* autoplay may be blocked */
        });
      }, 100);
    } else {
      video.pause();
    }

    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={clsx("absolute size-full overflow-hidden", className)}
    >
      {poster && (
        <Image
          quality={70}
          src={poster}
          alt="Video poster"
          className={clsx(
            "absolute inset-0 size-full object-cover object-center",
            videoReady ? "hidden" : "block",
          )}
          draggable={false}
        />
      )}
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop={loop}
        playsInline
        controls={false}
        onCanPlay={() => setVideoReady(true)}
        className={clsx(
          "absolute inset-0 size-full object-cover object-center",
          videoReady ? "block" : "hidden",
        )}
      />
    </div>
  );
};
