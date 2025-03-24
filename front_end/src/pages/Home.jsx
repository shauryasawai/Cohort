import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import PostPreview from "../components/PostPreview";
import { generatePost } from "../utils/api";
import "../index.css";

const Home = () => {
  const [loadingState, setLoadingState] = useState('idle'); // 'idle' | 'generating' | 'navigating'
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const navigate = useNavigate();

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      console.log("Network: Online");
      setNetworkStatus(true);
    };
    const handleOffline = () => {
      console.log("Network: Offline");
      setNetworkStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleGeneratePost = async (formData) => {
    if (!networkStatus) {
      setError("No internet connection. Please check your network.");
      return;
    }

    setLoadingState('generating');
    setError(null);
    console.log("Starting post generation with:", formData);

    try {
      const response = await generatePost({
        productName: formData.productName,
        description: formData.description,
        targetAudience: formData.targetAudience
      });

      console.log("API Response:", response);

      if (!response.image_url) {
        throw new Error("No image URL returned from API");
      }

      setPreviewData({
        productName: response.product_name,
        caption: response.caption,
        hashtags: response.hashtags,
        imageUrl: response.image_url
      });

    } catch (err) {
      console.error("Generation error:", err);
      setError(err.message || "Failed to generate post. Please try again.");
    } finally {
      setLoadingState('idle');
    }
  };

  const proceedToEditor = () => {
    if (previewData) {
      setLoadingState('navigating');
      console.log("Navigating to editor with:", previewData);
      navigate('/edit-post', { state: previewData });
    }
  };

  const resetForm = () => {
    setPreviewData(null);
    setError(null);
    console.log("Form reset");
  };

  // Debug renders
  console.log("Current state:", {
    loadingState,
    previewData,
    error,
    networkStatus
  });

  return (
    <div className="home-container">
      <h1>✨ Social Media Post Generator ✨</h1>
      
      {!networkStatus && (
        <div className="network-warning">
          You are currently offline. Some features may not work.
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      <PostForm 
        onSubmit={handleGeneratePost} 
        isLoading={loadingState === 'generating'} 
      />
      
      {previewData && (
        <div className="preview-section">
          <h2>Preview Your Post</h2>
          <PostPreview data={previewData} />
          
          <div className="preview-actions">
            <button 
              onClick={resetForm}
              disabled={loadingState !== 'idle'}
              className="secondary-btn"
            >
              Start Over
            </button>
            
            <button 
              onClick={proceedToEditor}
              disabled={loadingState !== 'idle'}
              className="primary-btn"
            >
              {loadingState === 'navigating' ? 'Loading Editor...' : 'Continue to Editor'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;