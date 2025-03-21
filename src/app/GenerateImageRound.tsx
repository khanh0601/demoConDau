"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SealGeneratorProps {
  textInner?: string;
  textWrap?: string;
  fontFamily?: string;
  color?: string;
}

export default function SealGeneratorRound({
  textInner = "Inner",
  textWrap = "OuterText",
  fontFamily = "Inter",
  color = "#D61F1F",
}: SealGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasSize = 300;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const outerRadius = 140;
    const innerRadius = 80;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    const textRadius = (outerRadius + innerRadius) / 2 - 20; // Điều chỉnh bán kính
    const angleStep = (2 * Math.PI) / textWrap.length;

    ctx.font = `48px ${fontFamily}`;
    ctx.fillStyle = color;

    // Vẽ từng ký tự theo góc quay
    for (let i = 0; i < textWrap.length; i++) {
      const angle = i * angleStep - Math.PI / 2;

      const x = centerX + Math.cos(angle) * textRadius;
      const y = centerY + Math.sin(angle) * textRadius;

      ctx.save();
      ctx.translate(x, y);
      const charWidth = ctx.measureText(textWrap[i]).width;
      const scaleX = Math.min(1, (angleStep * textRadius) / charWidth);
      ctx.rotate(angle + Math.PI / 2);
      ctx.scale(scaleX, 1);
      ctx.fillText(textWrap[i], 0, 0);
      ctx.restore();
    }


    // Draw inner text vertically
    const getColumns = (text: string): string[][] => {
      const len = text.length;
      if (len <= 3) return [[...text]];
      if (len === 4) return [[text[0], text[1]], [text[2], text[3]]];
      if (len === 5) return [[text[0], text[1]], [text[2], text[3], text[4]]];
      if (len === 6) return [[text[0], text[1], text[2]], [text[3], text[4], text[5]]];
      if (len === 7) return [[text[0], text[1]], [text[2], text[3], text[4]], [text[5], text[6]]];
      if (len === 8) return [[text[0], text[1], text[2], text[3]], [text[4], text[5], text[6], text[7]]];
      if (len === 9) return [[text[0], text[1], text[2]], [text[3], text[4], text[5]], [text[6], text[7], text[8]]];
      return [[text[0], text[1], text[2]], [text[3], text[4], text[5], text[6]], [text[7], text[8], text[9]]];
    };

    const columns = getColumns(textInner);
    console.log(columns)
    const totalCols = columns.length;
    const colWidth = innerRadius / columns.length + 20;
    // Loop through columns to draw them
    columns.forEach((colText, colIndex) => {
      const maxFontSize = colWidth;
      const fontSize = Math.min(maxFontSize, Math.floor(110 / colText.length));
      console.log(colWidth)
      ctx.font = `600 ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Calculate position for each column
      const colX = centerX - ((totalCols - 1) * colWidth) / 2 + colIndex * colWidth;
      const startY = centerY - (colText.length * fontSize) / 2 + fontSize / 2;

      ctx.save();

      // Calculate horizontal scale (stretching)
      let scaleX = colWidth / ctx.measureText(colText[0]).width;

      for (let i = 0; i < colText.length; i++) {
        const charWidth = ctx.measureText(colText[i]).width;
        const currentScaleX = colWidth / charWidth;
        scaleX = Math.min(scaleX, currentScaleX);
      }
      console.log(scaleX)
      // Apply scaling and translation
      ctx.translate(colX, 0);
      ctx.scale(scaleX, 1);

      // Draw each character in the column
      for (let i = 0; i < colText.length; i++) {
        ctx.fillText(colText[i], 0, startY + i * fontSize);
      }

      ctx.restore();
    });

    // Update image source
    setImageSrc(canvas.toDataURL("image/png"));
  }, [textInner, textWrap, fontFamily, color]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas ref={canvasRef} width={300} height={300} className="hidden" />

      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Seal Image"
          width={80}
          height={80}
          className="w-full"
        />
      )}
    </div>
  );
}
