import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { finalizePost } from '../utils/api';
import CanvasEditor from '../components/PostEditor/CanvasEditor';
import ControlsPanel from '../components/PostEditor/ControlsPanel';
import FinalizeForm from '../components/PostEditor/FinalizeForm';

const PostEditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state) {
      setPostData({
        productName: location.state.productName,
        caption: location.state.caption,
        hashtags: location.state.hashtags,
        imageUrl: location.state.imageUrl
      });
    }
  }, [location.state]);

  const handleFinalize = async (finalData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await finalizePost({
        caption: finalData.caption,
        hashtags: finalData.hashtags
      });
      navigate('/success'); // Or wherever you want to redirect
    } catch (err) {
      setError(err.message || "Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!postData) {
    return <div>Loading post data...</div>;
  }

  return (
    <div className="post-editor-page">
      <h1>Editing Post: {postData.productName}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <CanvasEditor imageUrl={postData.imageUrl} />
      
      <ControlsPanel />
      
      <FinalizeForm 
        initialCaption={postData.caption}
        initialHashtags={postData.hashtags}
        onSubmit={handleFinalize}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PostEditorPage;