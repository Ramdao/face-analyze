// pages/index.tsx (for Pages Router)
// OR app/page.tsx (for App Router) - if using App Router, add 'use client';

// If using App Router (Next.js 13+ default) uncomment the line below:
 'use client';

import { useState } from "react";
import WebcamCapture from "../components/WebcamCapture"; // Adjust path if necessary
import { analyzeFace } from "../../lib/gemini"; // Adjust path if necessary

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleCapture = async (image: string) => {
    setLoading(true);
    setResult(null); // Clear previous result
    setError(null);  // Clear previous error
    setImagePreview(image); // Set image preview

    console.log('Home: handleCapture called. Sending image to analyzeFace...');
    try {
      const response = await analyzeFace(image);
      setResult(response);
      console.log('Home: Analysis successful.');
    } catch (err) {
      console.error('Home: Error during analysis:', err);
      setError(`Failed to analyze: ${err instanceof Error ? err.message : String(err)}`);
      setResult(null); // Ensure result is cleared on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Gemini Face Analyzer</h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <WebcamCapture onCapture={handleCapture} />
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#007BFF' }}>Analyzing...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>}

      {imagePreview && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Captured Image:</h2>
          <img src={imagePreview} alt="Captured for analysis" style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h2>Analysis Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}