// components/WebcamCapture.tsx
'use client'; // This directive is necessary for client-side components in Next.js App Router

import React, { useRef } from 'react';
import Webcam from "react-webcam";

export default function WebcamCapture({ onCapture }: { onCapture: (imgSrc: string) => void }) {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log('WebcamCapture: Image captured, calling onCapture. Size:', imageSrc.length);
      onCapture(imageSrc);
    } else {
      console.error('WebcamCapture: Failed to get screenshot.');
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        videoConstraints={{ // Optional: Add video constraints for better control
            width: 320,
            height: 240,
            facingMode: "user" // "user" for front camera, "environment" for back camera
        }}
      />
      <button onClick={capture} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>Capture</button>
    </div>
  );
}