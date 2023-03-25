import React, { useRef, useEffect } from "react";
import bwipjs from "bwip-js";

export default function DatamatrixBarcode({ bytes }: { bytes: Buffer }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    console.log(bytes.toString("hex"))
    bwipjs.toCanvas(canvas, {
      bcid: "datamatrix", // Barcode type
      text: bytes.length === 0 ? "Dummy" : bytes.toString("utf8"), // Text to encode
      scale: 3, // 3x scaling factor
      height: 45, // Bar height, in millimeters
      // includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    });
  }, [bytes]);

  return <canvas ref={canvasRef} />;
}
