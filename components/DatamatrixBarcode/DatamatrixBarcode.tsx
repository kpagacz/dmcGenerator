import React, { useRef, useEffect } from "react";
import bwipjs from "bwip-js";

interface DatamatrixBarcodeProps {
  content: Uint8Array;
}
export default function DatamatrixBarcode({ content }: DatamatrixBarcodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    bwipjs.toCanvas(canvas, {
      bcid: "datamatrix", // Barcode type
      text: "Hello, World!", // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    });
  }, []);

  return <canvas ref={canvasRef} />;
}
