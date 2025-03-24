import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import PostPreview from "../components/PostPreview";
import { generatePost } from "../utils/api";
import "../index.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const navigate = useNavigate();

  const handleGeneratePost = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generatePost({
        productName: formData.productName,
        description: formData.description,
        targetAudience: formData.targetAudience
      });

      setPreviewData({
        productName: response.product_name,
        caption: response.caption,
        hashtags: response.hashtags,
        imageUrl: response.image_url
      });

    } catch (err) {
      setError(err.message || "Failed to generate post");
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const proceedToEditor = () => {
    if (previewData) {
      navigate('/edit-post', { state: previewData });
    }
  };

  return (
    <div className="home-container">
      <h1>✨ Social Media Post Generator ✨</h1>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      <PostForm onSubmit={handleGeneratePost} isLoading={isLoading} />
      
      {previewData && (
        <div className="preview-section">
          <PostPreview data={previewData} />
          <div className="preview-actions">
            <button onClick={() => setPreviewData(null)}>
              Start Over
            </button>
            <button 
              onClick={proceedToEditor} 
              disabled={isLoading}
              className="primary-btn"
            >
              {isLoading ? 'Loading...' : 'Continue to Editor'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;