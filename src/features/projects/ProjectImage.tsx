"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  screenshotUrl: string;
  ogImageUrl: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function ProjectImage({
  screenshotUrl,
  ogImageUrl,
  alt,
  width,
  height,
  className,
  priority,
}: Props) {
  const [src, setSrc] = useState(screenshotUrl);
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setSrc(ogImageUrl)}
    />
  );
}
