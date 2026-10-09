"use client";

import React, { useEffect, useRef } from "react";
import { audioEngine } from "@/lib/audioEngine";

interface AudioVisualizerCanvasProps {
  styleType?: "bars" | "wave" | "radial";
  colorAccent?: string;
}

export const AudioVisualizerCanvas: React.FC<AudioVisualizerCanvasProps> = ({
  styleType = "radial",
  colorAccent = "#38bdf8",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const bufferLength = 64;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animId = requestAnimationFrame(render);

      // Handle high DPI
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      audioEngine.getVisualizerData(dataArray);

      if (styleType === "radial") {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) * 0.45;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const numBars = 48;
        const step = (Math.PI * 2) / numBars;

        for (let i = 0; i < numBars; i++) {
          const val = dataArray[i % bufferLength] || 10;
          const barHeight = (val / 255) * (radius * 0.9);
          const angle = i * step;

          const x1 = centerX + Math.cos(angle) * (radius + 2);
          const y1 = centerY + Math.sin(angle) * (radius + 2);
          const x2 = centerX + Math.cos(angle) * (radius + 2 + barHeight);
          const y2 = centerY + Math.sin(angle) * (radius + 2 + barHeight);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = colorAccent;
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.shadowBlur = 8;
          ctx.shadowColor = colorAccent;
          ctx.stroke();
        }
        ctx.restore();
      } else if (styleType === "wave") {
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = colorAccent;
        ctx.shadowBlur = 10;
        ctx.shadowColor = colorAccent;

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
      } else {
        // Bars
        const barWidth = (width / bufferLength) * 1.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * 0.8;
          const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
          gradient.addColorStop(0, colorAccent);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.9)");

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
          x += barWidth;
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [colorAccent, styleType]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={160}
      className="w-full h-full max-h-[180px] pointer-events-none"
    />
  );
};
