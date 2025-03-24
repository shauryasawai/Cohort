import React, { useEffect, useRef } from 'react';

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw placeholder background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (!imageUrl) {
      ctx.fillStyle = 'red';
      ctx.font = '20px Arial';
      ctx.fillText('No image provided', 20, 30);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Important for external images
    
    img.onload = () => {
      // Clear canvas again before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate aspect ratio to maintain proportions
      const ratio = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const width = img.width * ratio;
      const height = img.height * ratio;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      
      ctx.drawImage(img, x, y, width, height);
    };
    
    img.onerror = () => {
      ctx.fillStyle = 'red';
      ctx.font = '20px Arial';
      ctx.fillText('Failed to load image', 20, 30);
      console.error('Failed to load image:', imageUrl);
    };
    
    img.src = imageUrl;

  }, [imageUrl]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={1000}
      style={{
        border: '4px solid #2c3e50',
        marginBottom: '20px',
        borderRadius: '15px',
        background: '#fff',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
      }}
    />
  );
};

export default CanvasEditor;