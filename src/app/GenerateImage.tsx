"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SealGeneratorProps {
  text?: string;
  fontFamily?: string;
  color?: string;
}

export default function SealGenerator({ text="Galaxy", fontFamily = "Inter", color = "#D61F1F" }: SealGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
console.log(text)
if(text==""){
  text="Galaxy"
}
  useEffect(() => {
    if (!text) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasSize = 300;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(5, 5, canvasSize - 10, canvasSize - 10);

    // Split text by spaces into columns
    const columns = text.split(" ");
    const numCols = columns.length;

    // Calculate width for each column
    const colWidth = (canvasSize - 20) / numCols;

    columns.forEach((colText, colIndex) => {
      // Calculate font size based on the maximum allowed width per character
      const maxFontSize = colWidth;
      const fontSize = Math.min(maxFontSize, Math.floor((canvasSize - 20) / colText.length));
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Center each column horizontally
      const x = 10 + colIndex * colWidth + colWidth / 2;
      const startY = (canvasSize - fontSize * colText.length) / 2 + fontSize / 2;

      for (let i = 0; i < colText.length; i++) {
        ctx.fillText(colText[i], x, startY + i * fontSize);
      }
    });

    // Update image source
    setImageSrc(canvas.toDataURL("image/png"));
  }, [text, fontFamily, color]);

  return (
    <div className="flex flex-col items-center space-y-4 text-inter">
      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} width={300} height={300} className="hidden" />

      {/* Display generated image */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Image Con Dau"
          width={80}
          height={80}
          className="w-full"
        />
      )}
    </div>
  );
}
