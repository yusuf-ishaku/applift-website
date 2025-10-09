"use client";

import type React from "react";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
}

export function ImageCropDialog({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
}: ImageCropDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, size, size);

    const scale = zoom;
    const imgWidth = image.naturalWidth * scale;
    const imgHeight = image.naturalHeight * scale;

    ctx.drawImage(image, position.x, position.y, imgWidth, imgHeight);

    // Draw crop overlay
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, size, size);
  }, [zoom, position]);

  useEffect(() => {
    if (imageRef.current?.complete) {
      drawCanvas();
    }
  }, [zoom, position, drawCanvas]);

  const handleImageLoad = () => {
    const image = imageRef.current;
    if (!image) return;

    const size = 300;
    const scale = Math.max(
      size / image.naturalWidth,
      size / image.naturalHeight,
    );
    setZoom(scale);

    const x = (size - image.naturalWidth * scale) / 2;
    const y = (size - image.naturalHeight * scale) / 2;
    setPosition({ x, y });

    setTimeout(() => drawCanvas(), 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const croppedImage = canvas.toDataURL("image/png");
    onCropComplete(croppedImage);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crop Profile Picture</DialogTitle>
          <DialogDescription>
            Adjust the image to fit within the square frame
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-muted">
            <img
              ref={imageRef}
              src={imageSrc || "/placeholder.svg"}
              alt="Source"
              className="hidden"
              onLoad={handleImageLoad}
            />
            <canvas
              ref={canvasRef}
              className="cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ width: "300px", height: "300px" }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Zoom</label>
            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={0.1}
              max={3}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>Apply Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
