"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SealGeneratorProps {
  text?: string;
  fontFamily?: string;
  color?: string;
}

export default function SealGenerator({ text = "Galaxy", fontFamily = "Inter", color = "#D61F1F" }: SealGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    console.log(text)
    if (!text.trim()) {
      text = "篆書体";
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasSize = 300;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Helper function to draw rounded rectangle
    const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    // Draw rounded border
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    drawRoundedRect(3, 3, canvasSize - 10, canvasSize - 10, 10);
    ctx.stroke();

    // Background text (Sample) with 15-degree rotation
    const sampleText = "Sample";
    ctx.save();
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.rotate((15 * Math.PI) / 180);

    ctx.font = `40px ${fontFamily}`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Light text for background
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textWidth = ctx.measureText(sampleText).width;

    const spacing = 30; // Spacing between text

    for (let y = -canvasSize; y < canvasSize * 2; y += spacing * 2) {
      for (let x = -canvasSize; x < canvasSize * 2; x += textWidth + spacing) {
        ctx.fillText(sampleText, x, y);
      }
    }

    ctx.restore();

    // Main Seal Text
    const columns = text.split(",");
    const numCols = columns.length;
    const colWidth = (canvasSize - 20) / numCols;

    columns.forEach((colText, colIndex) => {
      const maxFontSize = colWidth;
      const fontSize = Math.min(maxFontSize, Math.floor((canvasSize - 20) / colText.length));
      ctx.font = `600 ${fontSize}px ${fontFamily}`; // Font weight 600
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = 10 + colIndex * colWidth + colWidth / 2;
      const startY = (canvasSize - fontSize * colText.length) / 2 + fontSize / 2;

      // Measure the actual text width
      ctx.save();
      let scaleX = colWidth / ctx.measureText(colText[0]).width;

      for (let i = 0; i < colText.length; i++) {
        const charWidth = ctx.measureText(colText[i]).width;
        const currentScaleX = colWidth / charWidth;
        scaleX = Math.min(scaleX, currentScaleX);
      }
      ctx.translate(x, 0);
      ctx.scale(scaleX, 1); // Stretch horizontally
      for (let i = 0; i < colText.length; i++) {
        ctx.fillText(colText[i], 0, startY + i * fontSize);
      }
      ctx.restore(); // Reset transformations
    });

    // Update image source
    setImageSrc(canvas.toDataURL("image/png"));
  }, [text, fontFamily, color]);

  return (
    <div className="flex flex-col items-center space-y-4 text-inter">
      <canvas ref={canvasRef} width={300} height={300} className="hidden" />

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
